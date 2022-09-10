import {
  IsArray,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from "class-validator";
import { Trim } from "class-sanitizer";

export class CreateProductDTO {
  @IsNumber({}, { message: "id do restaurante tem que ser numero" } )
  public restaurant_id: number;

  @Trim()
  @IsString({ message: "nome tem que ser texto" })
  @Length(5, 20, { message: "tamanho minimo de 5 e maximo de 20" })
  public name: string;

  @Trim()
  @IsString({ message: "imagem tem que ser texto" })
  @MinLength(0, { message: "imagem é obrigatoria!" })
  public image: string;

  @IsNumber({}, { message: "preço tem que ser numero" } )
  public price: number;

  @Trim()
  @IsString({ message: "categoria tem que ser texto" })
  @MinLength(3, { message: "tamanho minimo de 3" })
  public category: string;
}
