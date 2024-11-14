import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EpisodeCreateDto, EpisodeUpdateDto } from './types/episodes.dto';
import { EpisodeEntity } from './types/episodes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EpisodesService {
    constructor(
        @InjectRepository(EpisodeEntity)
        private episodeRepository: Repository<EpisodeEntity>
    ) { }

    async createNewEpisode(data: EpisodeCreateDto) {
        const newEpisode = new EpisodeEntity()

        newEpisode.title = data.title
        newEpisode.podcastId = data.podcastId
        newEpisode.description = data.description
        newEpisode.duration = data.duration
        newEpisode.releaseDate = data.releaseDate
        newEpisode.featured = data.featured
        newEpisode.episodeNumber = data.episodeNumber

        return await this.episodeRepository.save(newEpisode)
    }

    async findAll() {
        return await this.episodeRepository.find()
    }

    async findFeatured() {
        return await this.episodeRepository.find({ where: { featured: true } })
    }

    async findOne(id: string) {
        const idToNumber = parseInt(id)
        const foundEpisode = await this.episodeRepository.findOne({ where: { id: idToNumber } })

        if (!foundEpisode) {
            throw new Error('Episode not found');
        }

        return foundEpisode
    }

    async deleteEpisode(id: string) {
        const idToNumber = parseInt(id)

        return await this.episodeRepository.delete({ id: idToNumber })
    }

    async updateEpisode(id: string, data: EpisodeUpdateDto) {
        const idToNumber = parseInt(id)

        return await this.episodeRepository.update({ id: idToNumber }, data)
    }
}
