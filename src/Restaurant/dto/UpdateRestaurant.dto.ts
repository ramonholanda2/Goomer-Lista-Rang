import { IsInt, IsObject, IsString, Length, MinLength } from "class-validator";
import { Trim } from "class-sanitizer";
import { OpeningHoursDTO } from "./OpeningHoursDTO";

export class UpdateRestaurantDTO {
  @IsInt({message: "id do restaurante é obrigatório"})
  public restaurant_id: number;

  @Length(5, 20, { message: "tamanho minimo de 5 e maximo de 20" })
  public name: string;

  @Trim()
  @MinLength(0, { message: "imagem é obrigatoria!" })
  public image: string;

  @Trim()
  @IsString()
  public address: string;


  @IsObject()
  public opening_hours: OpeningHoursDTO;
}
