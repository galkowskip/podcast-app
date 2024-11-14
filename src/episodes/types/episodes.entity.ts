import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EpisodeEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    podcastId: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    duration: number

    @Column()
    releaseDate: string

    @Column({default: false})
    featured: boolean

    @Column()
    episodeNumber: number
}