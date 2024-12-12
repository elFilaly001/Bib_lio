import { IsBoolean, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @MaxLength(70)
    title: string;

    @IsString()
    description: string;

    @IsString()
    authors: string;

    @IsString()
    publisher: string;

    @IsString()
    @MaxLength(13)
    isbn: string;

    @IsNumber()
    pageCount: number;

    @IsBoolean()
    available: boolean;
}
