import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { PodcastEntity } from './types/podcast.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EpisodesService } from 'src/episodes/episodes.service';
import { EpisodeCreateDto, EpisodeUpdateDto } from 'src/episodes/types/episodes.dto';
import { PodcastCreateDto, PodcastDto, PodcastUpdateDto } from './types/podcast.dto';

@Injectable()
export class PodcastsService {
    constructor(
        @InjectRepository(PodcastEntity)
        private readonly podcastRepository: Repository<PodcastEntity>,
        private readonly episodesService: EpisodesService,
    ) { }

    async findAll() {
        const podcasts = await this.podcastRepository.find()

        return await Promise.all(podcasts.map(async podcast => {
            return await this.getPodcastEpisodeData(podcast)
        }))
    }

    async findOne(id: string) {
        const idToNumber = parseInt(id)
        const foundPodcast = await this.podcastRepository.findOne({ where: { id: idToNumber } })

        if (!foundPodcast) {
            throw new Error('Podcast not found');
        }

        const podcast = await this.getPodcastEpisodeData(foundPodcast)

        return podcast
    }

    async getPodcastEpisodeData (podcastEntity: PodcastEntity) {
        const episodesAmount = await this.episodesService.getPodcastEpisodeCount(podcastEntity.id)
        const lastEpisode = await this.episodesService.getLastEpisode(podcastEntity.id)

        const podcast = {
            ...podcastEntity,
            lastEpisodeDate: lastEpisode?.releaseDate || undefined,
            episodesAmount: episodesAmount
        } as PodcastDto

        return podcast
    }

    async findEpisodes(id: string) {
        return await this.episodesService.findEpisodesByPodcastId(parseInt(id))
    }

    async findEpisode(id: string, episodeId: string) {
        return await this.episodesService.findOne(episodeId)
    }

    async findFeaturedEpisodes(id: string) {
        return await this.episodesService.findFeatured()
    }

    async createNewPodcast(data: PodcastCreateDto) {
        const newPodcast = new PodcastEntity()

        newPodcast.title = data.title
        newPodcast.description = data.description
        newPodcast.createdAt = new Date().toISOString()
        newPodcast.updatedAt = new Date().toISOString()
        newPodcast.rating = 0

        return await this.podcastRepository.save(newPodcast)
    }

    async updatePodcast(id: string, data: PodcastUpdateDto) {
        const idToNumber = parseInt(id)

        return await this.podcastRepository.update({ id: idToNumber }, {
            ...data,
            updatedAt: new Date().toISOString()
        })
    }

    async deletePodcast(id: string) {
        const idToNumber = parseInt(id)

        return await this.podcastRepository.delete({ id: idToNumber })
    }

    async createNewEpisode(id: string, data: EpisodeCreateDto) {
        return await this.episodesService.createNewEpisode({
            ...data,
            podcastId: parseInt(id)
        })
    }

    async updateEpisode(id: string, episodeId: string, data: EpisodeUpdateDto) {
        return await this.episodesService.updateEpisode(episodeId, {
            ...data,
            podcastId: parseInt(id)
        })
    }

    async deleteEpisode(id: string, episodeId: string) {
        return await this.episodesService.deleteEpisode(episodeId)
    }
}

