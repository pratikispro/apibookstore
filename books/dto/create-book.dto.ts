import { IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @IsString()
  author: string;

  @ApiProperty({ example: 'Classic Literature' })
  @IsString()
  category: string;

  @ApiProperty({ example: 12.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  rating: number;

  @ApiProperty({ example: '1925-04-10' })
  @IsDateString()
  publishedDate: string;
}
