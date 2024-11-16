import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from "typeorm";

@Entity()
export class EpisodeEntity {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number

    @ManyToOne(() => EpisodeEntity, episode => episode.id)
    @Column()
    podcastId: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    duration: number

    @Column()
    fileUrl: string

    @Column()
    releaseDate: string

    @Column({default: false})
    featured: boolean

    @Column()
    episodeNumber: number
}