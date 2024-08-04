import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({
    name: "user"
})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 10,
        comment: '用户名'
    })
    username: string;

    @Column({
        comment: '密码'
    })
    password: string;

    @Column({
        name: 'nick_name',
        length: 15,
        comment: '昵称'
    })
    nickName: string;

    @Column({
        comment: '头像',
        nullable: true
    })
    headPic: string;

    @CreateDateColumn({
        comment: '创建时间'
    })
    createdAt: Date;
}
