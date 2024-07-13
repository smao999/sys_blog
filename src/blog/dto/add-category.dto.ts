import { IsNotEmpty } from 'class-validator';

export class AddCategoryDto {

  @IsNotEmpty({
    message: '文章标题不能为空'
  })
  name: string;
}