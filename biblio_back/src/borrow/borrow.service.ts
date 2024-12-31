import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exist } from 'src/Helpres/Existence';
import { BorrowDocument } from './entities/borrow.schema';
import { BookDocument } from '../book/entities/book.schema';

@Injectable()
export class BorrowService {
  constructor(
    @InjectModel('Borrow') private readonly borrowModel: Model<BorrowDocument>,
    @InjectModel('Book') private readonly bookModel: Model<BookDocument>
  ) {}

  async borrowBook(borrowDto: CreateBorrowDto) {
    try {
      // Check if the book exists and is available
      const book = await Exist(this.bookModel, { isbn: borrowDto.isbn  }, true);

      // console.log(book.available);
      

      if (!book.available) {
        throw new BadRequestException('Book is not available for borrowing');
      }

      const borrowDate = new Date();
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 15);

      const newBorrow = new this.borrowModel({...borrowDto , borrowDate: borrowDate, returnDate: returnDate , returned: false});
      await newBorrow.save();

      await this.bookModel.updateOne({ isbn: borrowDto.isbn }, { available: false });

      return 'Book borrowed successfully';

    } catch (error) {
      throw error;
    }
  }

  async returnBook(data : UpdateBorrowDto ) {
    try {

      
      // console.log("test " , isbn);
      // Check if the book exists and is borrowed
      const borrowRecord = await Exist(this.borrowModel, { isbn: data.isbn , userId: data.userId }, true);
      // console.log("test2" , borrowRecord);

      if (!borrowRecord) {
        throw new BadRequestException('No active borrow record found for this book');
      }

      // // Update the borrow record to mark it as returned
      await this.borrowModel.updateOne({ isbn: data.isbn , userId: data.userId, returned: false }, { returned: true });

      // // Update the book's availability status
      await this.bookModel.updateOne({ isbn: data.isbn }, { available: true });

      return 'Book returned successfully';
    } catch (error) {
      throw error;
    }
  }
}
