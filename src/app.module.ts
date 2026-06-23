import { Module } from '@nestjs/common';
import { WelcomeController } from '@/welcome.controller';
import { BlogController } from '@/blog.controller';
import { BlogService } from '@/blog.service';

@Module({
  imports: [],
  controllers: [WelcomeController, BlogController],
  providers: [BlogService],
})
export class AppModule {}
