import { IsNotEmpty, IsString } from "class-validator";
import { clearScreenDown } from "readline";

export class CreateBorrowDto {

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    isbn: string;
}

