import { IsNotEmpty } from 'class-validator';

export class AddCategoryDto {

  @IsNotEmpty({
    message: '分类名称不能为空'
  })
  name: string;
}