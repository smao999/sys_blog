import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './blog.entity';

@Entity({
  name: "category"
})
export class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '分类名称'
  })
  name: string;

  @ManyToMany(() => Blog)
  blogs: Blog[];
}