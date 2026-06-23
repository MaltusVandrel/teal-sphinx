import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class BlogService {
  private postsPath = join(__dirname, '..', 'data', 'posts.json');
  private postHtmlRoot = join(__dirname, '..', 'views', 'posts');

  async getAllPosts() {
    const data = await readFile(this.postsPath, 'utf8');
    return JSON.parse(data);
  }

  async getPostById(id: string) {
    const posts = await this.getAllPosts();
    const post = posts.find((p) => String(p.id) === String(id));
    if (!post) {
      return undefined;
    }

    const htmlPath = join(this.postHtmlRoot, `post.${id}.hbs`);
    try {
      const html = await readFile(htmlPath, 'utf8');
      return { ...post, html };
    } catch {
      return undefined;
    }
  }
}
