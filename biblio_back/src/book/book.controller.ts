import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get("")
  findAll() {
    // console.log('findAll');
    return this.bookService.findAll();
  }

  @Get('find')
  findOne(@Query('isbn') isbn: string, @Query('title') title: string , @Query('author') author: string) {
    return this.bookService.findBytitleOrIsbn(isbn, title , author);
  }

  @Patch(':isbn')
  update(@Param('isbn') isbn: string, @Body() updateBookDto: UpdateBookDto) {
    console.log("test " , isbn);
    this.bookService.update(+isbn, updateBookDto);
    return "updated successfully";
  }

  @Delete(':isbn')
  remove(@Param('isbn') isbn: string) {
    return this.bookService.remove(+isbn);
  }
}
