import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService ) {}

  @Post()
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowService.borrowBook(createBorrowDto);
  }

  @Post('/return')
  returnBook(@Body() data: UpdateBorrowDto) {
    // console.log();
    
    return this.borrowService.returnBook(data);
  }

  @Get()
  findAll() {
    return this.borrowService.findAllBorrows();
  }



}
