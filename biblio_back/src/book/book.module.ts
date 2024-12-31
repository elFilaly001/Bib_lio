import { Module } from '@nestjs/common';
import { BookSchema }  from './entities/book.schema';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [MongooseModule]
})
export class BookModule {}
