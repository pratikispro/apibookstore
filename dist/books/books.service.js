"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./book.entity");
let BooksService = class BooksService {
    constructor(bookRepo) {
        this.bookRepo = bookRepo;
    }
    create(data) {
        const book = this.bookRepo.create(data);
        return this.bookRepo.save(book);
    }
    async findAll(query) {
        const { author, category, rating, search, sort, page = 1, limit = 10 } = query;
        const where = {};
        if (author)
            where.author = (0, typeorm_2.ILike)(`%${author}%`);
        if (category)
            where.category = (0, typeorm_2.ILike)(`%${category}%`);
        if (rating)
            where.rating = Number(rating);
        if (search)
            where.title = (0, typeorm_2.ILike)(`%${search}%`);
        const [data, total] = await this.bookRepo.findAndCount({
            where,
            order: sort ? { [sort.replace('-', '')]: sort.startsWith('-') ? 'DESC' : 'ASC' } : {},
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, total, page: Number(page), limit: Number(limit) };
    }
    async findOne(id) {
        const book = await this.bookRepo.findOne({ where: { id } });
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        return book;
    }
    async update(id, data) {
        await this.findOne(id);
        await this.bookRepo.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.bookRepo.delete(id);
        return { message: 'Book deleted successfully' };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map