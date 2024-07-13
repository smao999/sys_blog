import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import {Category} from './category.entity';
  
  @Entity('blog')
  export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      comment: '文章标题'
    })
    title: string;
  
    @Column({
      comment: '文章内容',
      type: 'longtext'
    })
    content: string;
  
    @CreateDateColumn({
      comment: '创建时间'
    })
    createdAt: Date;
  
    @UpdateDateColumn({
      comment: '更新时间',
      type: 'timestamp'
    })
    updatedAt: Date;
  
    @ManyToMany(() => Category)
    @JoinTable({
      name: 'blog_category'
    })
    categorys: Category[]
  }