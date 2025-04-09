import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(dto: CreateBookDto): Promise<import("./book.entity").Book>;
    findAll(query: any): Promise<{
        data: import("./book.entity").Book[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./book.entity").Book>;
    update(id: string, dto: UpdateBookDto): Promise<import("./book.entity").Book>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
