import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { CreateProductoDtoTesting_1, ProductoTest_1, UpdateProductoDtoTesting_1 } from '../testing/testingData';

describe('ProductosController', () => {
  let controller: ProductosController;
  let service: ProductosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [
        {
          provide: ProductosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductosController>(ProductosController);
    service = module.get<ProductosService>(ProductosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call productosService.create and return the result', async () => {
      const dto: CreateProductoDto = CreateProductoDtoTesting_1;
      const createdProducto = ProductoTest_1;
      jest.spyOn(service, 'create').mockResolvedValue(createdProducto);

      expect(await controller.create(dto)).toEqual(createdProducto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call productosService.findAll and return an array of productos', async () => {
      const productos = [ProductoTest_1];
      jest.spyOn(service, 'findAll').mockResolvedValue(productos);

      expect(await controller.findAll()).toEqual(productos);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call productosService.findOne and return a producto', async () => {
      const producto = ProductoTest_1
      jest.spyOn(service, 'findOne').mockResolvedValue(producto);

      expect(await controller.findOne('1')).toEqual(producto);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should call productosService.update and return the updated producto', async () => {
      const dto: UpdateProductoDto = UpdateProductoDtoTesting_1
      const existingProducto = ProductoTest_1
      const updatedProducto = { ...existingProducto, ...dto };
      jest.spyOn(service, 'update').mockResolvedValue(updatedProducto);

      expect(await controller.update('1', dto)).toEqual(updatedProducto);
      expect(service.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should call productosService.remove and return undefined', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});

