import { Test, TestingModule } from '@nestjs/testing';
import { FacturasController } from './facturas.controller';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { CreateFacturaDtoTest_1, FacturaTest_1 } from '../testing/testingData';
import { NotFoundException } from '@nestjs/common';

describe('FacturasController', () => {
  let controller: FacturasController;
  let service: FacturasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacturasController],
      providers: [
        {
          provide: FacturasService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FacturasController>(FacturasController);
    service = module.get<FacturasService>(FacturasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call facturasService.create and return the result', async () => {
      const dto: CreateFacturaDto = CreateFacturaDtoTest_1
      const createdFactura = FacturaTest_1
      jest.spyOn(service, 'create').mockResolvedValue(createdFactura);

      expect(await controller.create(dto)).toEqual(createdFactura);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call facturasService.findAll and return an array of facturas', async () => {
      const facturas = [FacturaTest_1, FacturaTest_1];
      jest.spyOn(service, 'findAll').mockResolvedValue(facturas);

      expect(await controller.findAll()).toEqual(facturas);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call facturasService.findOne and return a factura', async () => {
      const factura = FacturaTest_1;
      jest.spyOn(service, 'findOne').mockResolvedValue(factura);

      expect(await controller.findOne('1')).toEqual(factura);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if factura not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });
});

