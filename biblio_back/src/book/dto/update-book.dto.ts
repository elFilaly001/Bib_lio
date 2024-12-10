import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

class UpdateBookDto extends PartialType(CreateBookDto) {
    title?: string;
    description?: string;
    authors?: string;
    publisher?: string;
    pageCount?: number;
}

class BookAvailableDto extends PartialType(CreateBookDto) {
    available?: boolean;
}

export { UpdateBookDto, BookAvailableDto };
