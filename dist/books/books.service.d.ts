import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksService {
    private bookRepo;
    constructor(bookRepo: Repository<Book>);
    create(data: CreateBookDto): Promise<Book>;
    findAll(query: any): Promise<{
        data: Book[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<Book>;
    update(id: number, data: UpdateBookDto): Promise<Book>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
