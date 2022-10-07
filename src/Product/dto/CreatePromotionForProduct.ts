import {
    IsNumber,
    IsString,
    MinLength,
    IsNegative,
    IsObject
  } from "class-validator";
  import { Trim } from "class-sanitizer";
import { OpeningHoursDTO } from "../../Restaurant/dto/OpeningHoursDTO";
  
  export class CreatePromotionForProduct {
    @IsNumber({}, { message: "id do produto tem que ser numero" } )
    public product_id: number;
    
    @IsNumber({}, { message: "preço promocional tem que ser numero" } )
    public price_promotional: Number;
  
    @Trim()
    @IsString({ message: "descrição tem que ser texto" })
    @MinLength(0, { message: "descrição é obrigatoria!" })
    public description: string;

    @IsObject({ message: "horario aberto obrigatorio!"})
    public opening_hours_promotion: OpeningHoursDTO;
  }
  