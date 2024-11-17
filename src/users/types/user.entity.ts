import { IsOptional } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: string

    @Column()
    name: string

    @Column()
    createdAt: string

    @Column({
        nullable: true
    })
    updatedAt: string | null

    @Column({
        nullable: true
    })
    deletedAt: string | null
}