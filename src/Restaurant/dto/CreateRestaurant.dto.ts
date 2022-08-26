import { IsString, Length, MinLength } from "class-validator";
import { Trim } from "class-sanitizer";

export class CreateRestaurantDTO {
  @Length(5, 20, { message: "tamanho minimo de 5 e maximo de 20" })
  private name: string;

  @Trim()
  @MinLength(0, { message: "imagem é obrigatoria!" })
  private image: string;

  @Trim()
  @IsString()
  private address: string;

  @Trim()
  @IsString()
  private opening_hours: String;
}
