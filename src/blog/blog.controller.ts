import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AddBlogDto } from './dto/add-blog.dto';
import { AddCategoryDto } from './dto/add-category.dto';
import { RequireLogin } from 'src/custom.decorator';
import { EditBlogDto } from './dto/edit-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('add')
  @RequireLogin()
  async addBlog(@Body() blog: AddBlogDto) {
    return this.blogService.addBlog(blog);
  }

  @Get()
  async getBlogs(@Query('id') id: string) {
    return this.blogService.getBlogs(id);
  }

  @Post('edit')
  @RequireLogin()
  async editBlog(@Body() blog: EditBlogDto) {
    return this.blogService.editBlog(blog);
  }

  @Post('category')
  @RequireLogin()
  async addCategory(@Body() category: AddCategoryDto) {
    return this.blogService.addCategory(category);
  }

  @Get('category')
  async getCategories() {
    return this.blogService.getCategories();
  }
}
