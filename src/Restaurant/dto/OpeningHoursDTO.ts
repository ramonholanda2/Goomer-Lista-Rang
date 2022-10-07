import { Trim } from "class-sanitizer";
import { IsArray, IsString, ValidateIf } from "class-validator";
import { IsHourValid } from "./decorators/IsHourValid";
import { VerifyDaysWeek } from "./decorators/VerifyDaysWeek";

export class OpeningHoursDTO {
  restaurant_id: number;
  @Trim()
  @IsString({ message: "horário tem que ser texto" })
  @IsHourValid("VerifyDaysWeek", { message: "horário no formato incorreto (ex: 09:45)" })
  public hour_open: string;

  @Trim()
  @IsString({ message: "horário tem que ser texto" })
  @IsHourValid("VerifyDaysWeek", { message: "horário no formato incorreto (ex: 10:30)" })
  public hour_close: string;

  @IsArray({ message: "dias da semana tem que ser uma lista" })
  @VerifyDaysWeek("VerifyDaysWeek", { message: "dia da semana inválido ou duplicado" })
  public days_week: string[];
}
