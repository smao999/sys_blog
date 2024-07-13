import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AddBlogDto } from './dto/add-blog.dto';
import { AddCategoryDto } from './dto/add-category.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('add')
  async addBlog(@Body() blog: AddBlogDto) {
    return this.blogService.addBlog(blog);
  }

  @Get()
  async getBlogs(@Query('id') id: string) {
    return this.blogService.getBlogs(id);
  }

  @Post('category')
  async addCategory(@Body() category: AddCategoryDto) {
    return this.blogService.addCategory(category);
  }

  @Get('category')
  async getCategories() {
    return this.blogService.getCategories();
  }
}
