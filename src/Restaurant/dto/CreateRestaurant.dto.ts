import { IsString, Length, MinLength } from "class-validator";
import { Trim } from "class-sanitizer";

export class CreateRestaurantDTO {
  @Length(10, 20)
  private title: string;

  @Trim()
  @MinLength(0)
  private image: string;

  @Trim()
  @IsString()
  private address: string;

  @Trim()
  @IsString()
  private opening_hours: String;
}
