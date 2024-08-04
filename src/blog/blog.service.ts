import { Injectable, Logger } from '@nestjs/common';
import { AddBlogDto } from './dto/add-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { In, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { AddCategoryDto } from './dto/add-category.dto';
import { EditBlogDto } from './dto/edit-blog.dto';

@Injectable()
export class BlogService {
    private logger = new Logger();

    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>;

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>;

    /**
     * 添加博客
     * @param AddBlogDto 
     */
    async addBlog(blog: AddBlogDto) {
        const categorys = await this.categoryRepository.findBy({id: In(blog.categorys)});

        const newBlog = new Blog();
        newBlog.title = blog.title;
        newBlog.content = blog.content;
        newBlog.categorys = [...categorys];

        try {
            await this.blogRepository.save(newBlog);
            return {code: 1, message: '添加成功'};
        } catch (error) {
            this.logger.error(error);
            return {code: 0, message: '添加失败'}
        }
    }

    async editBlog(info: EditBlogDto) {
        const blog = await this.blogRepository.findOne({
            relations: ['categorys'],
            where: {id: info.id}
        });
        blog.title = info.title;
        blog.content = info.content;
        blog.categorys = info.categorys?.map(id => {
            const category = new Category();
            category.id = id;
            return category;
        });
        try {
            await this.blogRepository.save(blog);
            return {code: 1, message: '编辑成功'};
        } catch (error) {
            this.logger.error(error);
            return {code: 0, message: '编辑失败'}
        }
    }

    /**
     * 查看博客
     * @param id 
     */
    async getBlogs(id: string) {
        return await this.blogRepository.findOne({
            relations: ['categorys'],
            where: {id}
        });
    }

    /**
     * 添加分类
     * @param category 
     */
    async addCategory(category: AddCategoryDto) {
        const newCategory = new Category();
        newCategory.name = category.name;

        try {
            await this.categoryRepository.save(newCategory);
            return {code: 1, message: '添加成功'};
        } catch (error) {
            this.logger.error(error);
            return {code: 0, message: '添加失败'}
        }
    }

    /**
     * 查看分类
     */
    async getCategories() {
        return await this.categoryRepository.find();
    }
}
