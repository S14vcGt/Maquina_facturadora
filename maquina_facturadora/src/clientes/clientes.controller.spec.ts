import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { CreateClientesDto } from './dtos/Createclientes.dto';
import { NotFoundException } from '@nestjs/common';
import { ClientesTest1, CreateClientesDtoTest1 } from '../testing/testingData';
import { TestingUUID1 } from '../testing/const';

describe('ClientesController', () => {
  let controller: ClientesController;
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        {
          provide: ClientesService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a cliente if found', async () => {
      const cliente = ClientesTest1;
      jest.spyOn(service, 'findOne').mockResolvedValue(cliente);

      expect(await controller.findOne(TestingUUID1)).toEqual(cliente);
      expect(service.findOne).toHaveBeenCalledWith(TestingUUID1);
    });

    it('should throw a NotFoundException if cliente not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new cliente', async () => {
      const dto: CreateClientesDto = CreateClientesDtoTest1;
      const createdCliente = ClientesTest1;
      jest.spyOn(service, 'create').mockResolvedValue(createdCliente);

      expect(await controller.create(dto)).toEqual(createdCliente);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});
