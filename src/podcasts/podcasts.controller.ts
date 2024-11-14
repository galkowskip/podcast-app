import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastCreateDto, PodcastUpdateDto } from './types/podcast.dto';
import { EpisodeCreateDto } from 'src/episodes/types/episodes.dto';

@Controller('podcasts')
export class PodcastsController {
    constructor(private readonly podcastsService: PodcastsService) { }

    @Get()
    async findAll() {
        return await this.podcastsService.findAll()
    }

    @Get(':id')
    async findOne(@Param() { id }: { id: string }) {
        return this.podcastsService.findOne(id)
    }

    @Get(':id/episodes')
    async findEpisodes(@Param() { id }: { id: string }) {
        return this.podcastsService.findEpisodes(id)
    }

    @Get(':id/episodes/:episodeId')
    async findEpisode(@Param () { id, episodeId }: { id: string, episodeId: string }) {
        return this.podcastsService.findEpisode(id, episodeId)
    }

    @Get(':id/episodes/featured')
    async findFeaturedEpisodes(@Param() { id }: { id: string }) {
        return this.podcastsService.findFeaturedEpisodes(id)
    }

    @Post()
    async create(@Body() data: PodcastCreateDto) {
        return this.podcastsService.createNewPodcast(data)
    }

    @Put(':id')
    async update(@Body() data: PodcastUpdateDto, @Param() { id }: { id: string }) {
        return this.podcastsService.updatePodcast(id, data)
    }

    @Delete(':id')
    async delete(@Param() { id }: { id: string }) {
        return this.podcastsService.deletePodcast(id)
    }

    @Post(':id/episodes')
    async createEpisode(@Param() { id }: { id: string }, @Body() data: EpisodeCreateDto) {
        return this.podcastsService.createNewEpisode(id, data)
    }

    @Put(':id/episodes/:episodeId')
    async updateEpisode(@Param() { id, episodeId }: { id: string, episodeId: string }, @Body() data: EpisodeCreateDto) {
        return this.podcastsService.updateEpisode(id, episodeId, data)
    }

    @Delete(':id/episodes/:episodeId')
    async deleteEpisode(@Param() { id, episodeId }: { id: string, episodeId: string }) {
        return this.podcastsService.deleteEpisode(id, episodeId)
    }
}
