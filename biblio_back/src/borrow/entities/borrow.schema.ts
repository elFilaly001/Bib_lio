import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate, IsMongoId , IsString } from "class-validator";
import { HydratedDocument } from "mongoose";

export type BorrowDocument = HydratedDocument<Borrow>;
@Schema()
export class Borrow {
    @Prop({required: true})
    @IsMongoId()
    isbn:string;

    @Prop({required: true})
    @IsMongoId()
    userId: string;

    @Prop({required: true , default: Date.now()})
    @IsDate()
    borrowDate: Date;

    @Prop({required: true })
    @IsDate()
    returnDate: Date;

    @Prop({required: true , default: false})
    returned: boolean;
}

export const BorrowSchema = SchemaFactory.createForClass(Borrow);