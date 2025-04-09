import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'bony004',
      database: 'bookstore',
      autoLoadEntities: true,
      synchronize: true, // 
    }),
    AuthModule,
    UsersModule,
    BooksModule,
  ],
})
export class AppModule {}
