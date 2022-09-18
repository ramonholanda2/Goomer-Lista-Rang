import { Trim } from "class-sanitizer";
import { IsArray, IsString } from "class-validator";

export class OpeningHoursDTO {
  restaurant_id: number;
  @Trim()
  @IsString()
  public of: string;

  @Trim()
  @IsString()
  public to: string;

  @IsArray()
  public in: string[];
}
