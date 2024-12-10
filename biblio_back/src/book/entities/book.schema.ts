import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsBoolean, IsNumber, IsString, MaxLength } from 'class-validator';
import { Document } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop({required: true})
    @IsString()
    title: string;

    @Prop({required: true})
    @IsString()
    description: string;
    
    @Prop({required: true})
    @IsString()
    authors: string;

    @Prop({required: true})
    @IsString()
    publisher: string;

    @Prop({required: true , unique: true})
    @IsNumber()
    @MaxLength(13)
    isbn: number;

    @Prop({required: true})
    @IsNumber()
    pageCount: number;

    @Prop({required: true})
    @IsBoolean()
    available: boolean;
}


export const BookSchema = SchemaFactory.createForClass(Book);