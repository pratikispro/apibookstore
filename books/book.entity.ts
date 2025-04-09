import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column('decimal')
  price: number;

  @Column('decimal')
  rating: number;

  @Column()
  publishedDate: Date;
}
