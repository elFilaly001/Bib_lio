import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Exist} from '../Helpres/Existence'

@Injectable()
export class BookService {
  constructor(@InjectModel ('Book') private readonly bookModel ) {}

  async create(Data: CreateBookDto) {
    try {
      await Exist(this.bookModel,{title:Data.title , isbn:Data.isbn} , false);
      const book = new this.bookModel(Data);
      return await book.save();
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const AllBooks = await this.bookModel.find();
      if (AllBooks.length === 0 || !AllBooks) {
        throw new NotFoundException('No books found');
      }
      return AllBooks
    } catch (error) {
      throw error
    }
  }

  async findBytitleOrIsbn(isbn: string, title: string) {
    try {

      const book = await this.bookModel.find({$or: [{ title: title }, { isbn: isbn }]});

      if (book.length === 0 || !book) {
        throw new NotFoundException('Book not found');
      }
      return book
    } catch (error) {

      throw error

    }
  }

  async update(isbn: number, updateBookDto: UpdateBookDto) {
    try {
    Exist(this.bookModel,{isbn: isbn}, true);
    
    const NewBook = await this.bookModel.updateOne({ isbn: isbn }, updateBookDto);
    if (!NewBook) {
      throw new BadRequestException("please check your data");
    }

    return "updated successfully"
    } catch (error) {
       throw error
    }
  }


  async remove(isbn: number) {
    try {

      Exist(this.bookModel,{isbn: isbn}, true);

      const deletedBook = await this.bookModel.deleteOne({ isbn: isbn });
      return "deleted successfully"

    } catch (error) {
      throw error
    }
  }
}
