import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { BlogService } from './blog.service';

@Controller()
export class WelcomeController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async showWelcome(@Res() res: Response) {
    const posts = await this.blogService.getAllPosts();
    res.render('index', { posts, layout: 'layouts/main' });
  }
}
