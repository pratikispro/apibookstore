import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  create(data: CreateBookDto) {
    const book = this.bookRepo.create(data);
    return this.bookRepo.save(book);
  }

  async findAll(query: any) {
    const { author, category, rating, search, sort, page = 1, limit = 10 } = query;
    const where: any = {};

    if (author) where.author = ILike(`%${author}%`);
    if (category) where.category = ILike(`%${category}%`);
    if (rating) where.rating = Number(rating);
    if (search) where.title = ILike(`%${search}%`);

    const [data, total] = await this.bookRepo.findAndCount({
      where,
      order: sort ? { [sort.replace('-', '')]: sort.startsWith('-') ? 'DESC' : 'ASC' } : {},
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page: Number(page), limit: Number(limit) };
  }

  async findOne(id: number) {
    const book = await this.bookRepo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: number, data: UpdateBookDto) {
    await this.findOne(id); // check exists
    await this.bookRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id); // check exists
    await this.bookRepo.delete(id);
    return { message: 'Book deleted successfully' };
  }
}
