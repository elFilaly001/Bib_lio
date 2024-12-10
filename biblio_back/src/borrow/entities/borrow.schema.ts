import { Prop, Schema } from "@nestjs/mongoose";
import { IsDate, IsMongoId , IsString } from "class-validator";

@Schema()
export class borrowSchema {
    @Prop({required: true})
    @IsMongoId()
    bookId:string;

    @Prop({required: true})
    @IsMongoId()
    userId: string;

    @Prop({required: true , default: Date.now()})
    @IsDate()
    borrowDate: Date;

    @Prop({required: true })
    @IsDate()
    returnDate: Date;
}