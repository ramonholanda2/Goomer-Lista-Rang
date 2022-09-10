import { IsNumber } from "class-validator";

export class DeleteProductDTO {
    @IsNumber({}, { message: "id do restaurante tem que ser numero" } )
    public restaurant_id: number;
}