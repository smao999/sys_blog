interface Category {
  id: string;
  name: string;
}

export class EditBlogVo {
  id: string;

  title: string;

  categorys: Category[];

  content: string;
}