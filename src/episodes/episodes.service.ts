import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EpisodeCreateDto, EpisodeUpdateDto } from './types/episodes.dto';
import { EpisodeEntity } from './types/episodes.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { writer } from 'repl';

@Injectable()
export class EpisodesService {
    constructor(
        @InjectRepository(EpisodeEntity)
        private episodeRepository: Repository<EpisodeEntity>
    ) { }

    async createNewEpisode(podcastId: number, data: EpisodeCreateDto, file: Express.Multer.File) {
        const newEpisode = new EpisodeEntity()
        const nextEpisodeNumber = await this.findNextEpisodeNumber(podcastId)

        console.log(nextEpisodeNumber)

        try {
            await this.uploadEpisodeFile(podcastId, nextEpisodeNumber, file)

            newEpisode.title = data.title
            newEpisode.podcastId = podcastId
            newEpisode.description = data.description
            newEpisode.duration = Number(data.duration)
            newEpisode.releaseDate = data.releaseDate
            newEpisode.featured = data.featured === 'true' ? true : false
            newEpisode.episodeNumber = nextEpisodeNumber
            newEpisode.fileUrl = `podcast-${podcastId}-episode-${nextEpisodeNumber}.mp3`

            return await this.episodeRepository.save(newEpisode)
        } catch (err) {
            throw new Error('Error saving episode file')
        }
    }

    async findAll() {
        return await this.episodeRepository.find()
    }

    async findEpisodesByPodcastId(podcastId: number) {
        return await this.episodeRepository.find({ where: { podcastId } })
    }

    async findFeatured(podcastId: number) {
        return await this.episodeRepository.find({ where: { podcastId: podcastId, featured: true } })
    }

    async findOne(podcastId: number, id: number) {
        const foundEpisode = await this.episodeRepository.findOne({ where: { podcastId: podcastId, id: id } })

        if (!foundEpisode) {
            throw new Error('Episode not found');
        }

        return foundEpisode
    }

    async deleteEpisode(podcastId: number, id: number) {

        return await this.episodeRepository.delete({ id: id })
    }

    async updateEpisode(podcastId: number, id: number, data: EpisodeUpdateDto) {

        return await this.episodeRepository.update({ id: id }, data)
    }

    async findNextEpisodeNumber(podcastId: number) {
        const episodes = await this.episodeRepository.find({ where: { podcastId } })

        if (episodes.length <= 0) {
            return 1
        }

        const episodeNumbers = episodes.map(episode => episode.episodeNumber)
        const maxEpisodeNumber = Math.max(...episodeNumbers)

        return maxEpisodeNumber + 1
    }

    async getPodcastEpisodeCount(podcastId: number) {
        const episodes = await this.episodeRepository.count({ where: { podcastId } })

        return episodes < 0 ? episodes : 0
    }

    async getLastEpisode(podcastId: number) {
        const lastEpisode = await this.episodeRepository.findOne({ where: { podcastId }, order: { releaseDate: 'DESC' } })

        return lastEpisode
    }

    async uploadEpisodeFile(podcastId: number, episodeNumber: number, file: Express.Multer.File): Promise<boolean> {
        const filePath = join(__dirname, '..', '..', 'uploads', `podcast-${podcastId}-episode-${episodeNumber}.mp3`);
        console.log(filePath)
        const writeStream = createWriteStream(filePath);

        return writeStream.write(file.buffer, (err) => {
            if (err) {
                throw err;
            }

            return true
        });
    }
}
