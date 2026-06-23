import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { BlogService } from './blog.service';

@Controller('post')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get(':id')
  async showPost(@Param('id') id: string, @Res() res: Response) {
    const post = await this.blogService.getPostById(id);
    if (!post) throw new NotFoundException('Post not found');
    res.render('post', { post, layout: 'layouts/main' });
  }
}
