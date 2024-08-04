import { IsNotEmpty } from 'class-validator';

export class EditBlogDto {
  @IsNotEmpty({
    message: 'id不能为空'
  })
  id:string

  title?: string;

  categorys?: string[];

  content?: string;
}