import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString} from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';


export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop({required: true , unique: true})
    title: string;

    @Prop({required: true})
    description: string;
    
    @Prop({required: true})
    authors: string;

    @Prop({required: true})
    publisher: string;

    @Prop({required: true , unique: true})
    @IsString()
    isbn: number;

    @Prop({required: true})
    pageCount: number;

    @Prop({required: true})
    available: boolean;
}


export const BookSchema = SchemaFactory.createForClass(Book);