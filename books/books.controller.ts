import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Books') // Shows "Books" section in Swagger
@ApiBearerAuth()  // Adds Bearer token auth to these routes
@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books with filters, search, pagination' })
  findAll(@Query() query: any) {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by ID' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.booksService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book by ID' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
