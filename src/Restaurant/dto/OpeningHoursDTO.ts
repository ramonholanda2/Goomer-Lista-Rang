import { Trim } from "class-sanitizer";
import { IsArray, IsString, ValidateIf } from "class-validator";
import { VerifyDaysWeek } from "./decorators/VerifyDaysWeek";

export class OpeningHoursDTO {
  restaurant_id: number;
  @Trim()
  @IsString()
  public hour_open: string;

  @Trim()
  @IsString()
  public hour_close: string;

  @IsArray({ message: "dias da semana tem que ser uma lista" })
  @VerifyDaysWeek("VerifyDaysWeek", { message: "dia da semana inválido ou duplicado" })
  public days_week: string[];
}
