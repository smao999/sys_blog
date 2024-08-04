import { IsNotEmpty } from 'class-validator';

export class AddBlogDto {

  @IsNotEmpty({
    message: '文章标题不能为空'
  })
  title: string;

  @IsNotEmpty({
    message: '文章分类不能为空'
  })
  categorys: string[];

  @IsNotEmpty({
    message: '文章分类不能为空'
  })
  content: string;
}