import { Injectable } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BookAvailableDto } from 'src/book/dto/update-book.dto';
import { Exist } from 'src/Helpres/Existence';

@Injectable()
export class BorrowService {

  constructor(@InjectModel('Borrow') private readonly borrowModel, @InjectModel ('Book') private readonly bookModel) {}
  async create(createBorrowDto: CreateBorrowDto) {

    Exist(this.borrowModel , {isbn: createBorrowDto.bookId , userId: createBorrowDto.userId} , false);
    return 'This action adds a new borrow';
  }

  findAll() {
    return `This action returns all borrow`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrow`;
  }

  update(id: number, updateBorrowDto: UpdateBorrowDto) {
    return `This action updates a #${id} borrow`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrow`;
  }
}
