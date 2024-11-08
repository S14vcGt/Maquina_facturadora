import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Clientes } from './clientes.entity';
import { NotFoundException } from '@nestjs/common';
import { ClientesTest1, CreateClientesDtoTest1 } from '../testing/testingData';

describe('ClientesService', () => {
  let service: ClientesService;
  let repository: Repository<Clientes>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: getRepositoryToken(Clientes),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    repository = module.get<Repository<Clientes>>(getRepositoryToken(Clientes));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should check if an instance exist', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(ClientesTest1);
      expect(await service.checkExistence(ClientesTest1.id)).toEqual(ClientesTest1);
    });
    it('should return a cliente if found', async () => {
      const cliente: Clientes = ClientesTest1;
      jest.spyOn(service, 'checkExistence').mockResolvedValueOnce(cliente);
      const result = await service.findOne(cliente.id);
      expect(service.checkExistence).toHaveBeenCalledWith(cliente.id);
      expect(result).toEqual(cliente);
    });

    it('should throw a NotFoundException if not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new cliente', async () => {
      const dto = CreateClientesDtoTest1;
      const createdCliente = ClientesTest1;
      jest.spyOn(repository, 'create').mockReturnValue(dto as Clientes);
      jest.spyOn(repository, 'save').mockResolvedValue(createdCliente);

      expect(await service.create(dto)).toEqual(createdCliente);
    });
  });
});
