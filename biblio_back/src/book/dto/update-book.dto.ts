import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

class UpdateBookDto extends PartialType(CreateBookDto) {
    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsString()
    authors?: string

    @IsString()
    publisher?: string;

    @IsNumber()
    pageCount?: number;
}

class BookAvailableDto extends PartialType(CreateBookDto) {

    @IsBoolean()
    available?: boolean;
}

export { UpdateBookDto, BookAvailableDto };
