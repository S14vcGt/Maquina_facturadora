import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura])],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule {}
