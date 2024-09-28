import { IsDefined, IsNumberString } from 'class-validator';
import { UpdateProductoDto } from 'src/productos/dto/update-producto.dto';

export class productsListDto {
  @IsNumberString()
  cantidad: number;
  @IsDefined()
  producto: UpdateProductoDto;
}
