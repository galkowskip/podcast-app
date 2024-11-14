import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PodcastEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({
        default: 0
    })
    rating: number

    @Column()
    createdAt: string

    @Column()
    updatedAt: string
}