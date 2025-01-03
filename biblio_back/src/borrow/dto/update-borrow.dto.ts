import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowDto } from './create-borrow.dto';

export class UpdateBorrowDto extends PartialType(CreateBorrowDto) {
    userId: string 
    isbn: string
    returned: boolean
}
