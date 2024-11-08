import { Test, TestingModule } from '@nestjs/testing';
import { FacturasService } from './facturas.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateFacturaDtoTest_1, FacturaTest_1 } from '../testing/testingData';

describe('FacturasService', () => {
  let service: FacturasService;
  let repository: Repository<Factura>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacturasService,
        {
          provide: getRepositoryToken(Factura),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FacturasService>(FacturasService);
    repository = module.get<Repository<Factura>>(getRepositoryToken(Factura));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new factura', async () => {
      const dto = CreateFacturaDtoTest_1
      const createdFactura = FacturaTest_1;
      jest.spyOn(repository, 'create').mockReturnValue(createdFactura);
      jest.spyOn(repository, 'save').mockResolvedValue(createdFactura);

      expect(await service.create(dto)).toEqual(createdFactura);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(createdFactura);
    });
  });

  describe('findAll', () => {
    it('should return an array of facturas', async () => {
      const facturas = [FacturaTest_1, FacturaTest_1];
      jest.spyOn(repository, 'find').mockResolvedValue(facturas);

      expect(await service.findAll()).toEqual(facturas);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a factura if found', async () => {
      const factura = FacturaTest_1;
      jest.spyOn(service, 'checkExistence').mockResolvedValue(factura);

      expect(await service.findOne(FacturaTest_1.id)).toEqual(factura);
      expect(service.checkExistence).toHaveBeenCalledWith(FacturaTest_1.id);
    });

    it('should throw a NotFoundException if not found', async () => {
      jest.spyOn(service, 'checkExistence').mockRejectedValue(new NotFoundException());

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('checkExistence', () => {
    it('should return a factura if it exists', async () => {
      const factura = FacturaTest_1;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(factura);

      expect(await service.checkExistence('1')).toEqual(factura);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw a NotFoundException if factura does not exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.checkExistence('1')).rejects.toThrow(
        new NotFoundException('Factura no registrada')
      );
    });
  });
});

