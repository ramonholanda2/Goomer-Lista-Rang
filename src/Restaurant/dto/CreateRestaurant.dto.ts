import { IsString, Length, MinLength } from "class-validator";
import { Trim } from "class-sanitizer";

export class CreateRestaurantDTO {
  @Length(5, 20, { message: "tamanho minimo de 5 e maximo de 20" })
  public name: string;

  @Trim()
  @MinLength(0, { message: "imagem é obrigatoria!" })
  public image: string;

  @Trim()
  @IsString({ message: "endereço obrigatorio!" })
  public address: string;

  @Trim()
  @IsString({ message: "horário aberto obrigatório!" })
  public opening_hours: String;
}
