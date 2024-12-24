import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowSchema } from './entities/borrow.schema';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Borrow', schema: BorrowSchema }]),
    BookModule,
  ],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
