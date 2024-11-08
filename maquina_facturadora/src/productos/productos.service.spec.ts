import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { NotFoundException } from '@nestjs/common';
import {
  CreateProductoDtoTesting_1,
  ProductoTest_1,
  UpdateProductoDtoTesting_1,
} from '../testing/testingData';

describe('ProductosService', () => {
  let service: ProductosService;
  let repository: Repository<Producto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductosService,
        {
          provide: getRepositoryToken(Producto),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
    repository = module.get<Repository<Producto>>(getRepositoryToken(Producto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new producto', async () => {
      const dto = CreateProductoDtoTesting_1;
      const createdProducto = ProductoTest_1;
      jest.spyOn(repository, 'create').mockReturnValue(createdProducto);
      jest.spyOn(repository, 'save').mockResolvedValue(createdProducto);

      expect(await service.create(dto)).toEqual(createdProducto);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(createdProducto);
    });
  });

  describe('findAll', () => {
    it('should return an array of productos', async () => {
      const productos = [ProductoTest_1];
      jest.spyOn(repository, 'find').mockResolvedValue(productos);

      expect(await service.findAll()).toEqual(productos);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a producto if found', async () => {
      const producto = ProductoTest_1;
      jest.spyOn(service, 'checkExistence').mockResolvedValue(producto);

      expect(await service.findOne('1')).toEqual(producto);
      expect(service.checkExistence).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if producto not found', async () => {
      jest
        .spyOn(service, 'checkExistence')
        .mockRejectedValue(new NotFoundException());

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing producto', async () => {
      const existingProducto = ProductoTest_1;
      const dto = UpdateProductoDtoTesting_1;
      const updatedProducto = { ...existingProducto, ...dto };

      jest.spyOn(service, 'checkExistence').mockResolvedValue(existingProducto);
      jest
        .spyOn(repository, 'merge')
        .mockReturnValue(updatedProducto as Producto);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue(updatedProducto as Producto);

      expect(await service.update('1', dto)).toEqual(updatedProducto);
      expect(service.checkExistence).toHaveBeenCalledWith('1');
      expect(repository.merge).toHaveBeenCalledWith(existingProducto, dto);
      expect(repository.save).toHaveBeenCalledWith(updatedProducto);
    });
  });

  describe('remove', () => {
    it('should remove an existing producto', async () => {
      const producto = ProductoTest_1;

      jest.spyOn(service, 'checkExistence').mockResolvedValue(producto);
      jest.spyOn(repository, 'remove').mockResolvedValue(null);

      await service.remove('1');
      expect(service.checkExistence).toHaveBeenCalledWith('1');
      expect(repository.remove).toHaveBeenCalledWith(producto);
    });
  });

  describe('checkExistence', () => {
    it('should return a producto if it exists', async () => {
      const producto = ProductoTest_1;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(producto);

      expect(await service.checkExistence('1')).toEqual(producto);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw a NotFoundException if producto does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.checkExistence('1')).rejects.toThrow(
        new NotFoundException('Product not registered')
      );
    });
  });
});
