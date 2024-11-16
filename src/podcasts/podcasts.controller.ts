import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastCreateDto, PodcastUpdateDto } from './types/podcast.dto';

@Controller('podcasts')
export class PodcastsController {
    constructor(
        private readonly podcastsService: PodcastsService,
    ) { }

    @Get()
    async findAll() {
        return await this.podcastsService.findAll()
    }

    @Get(':id')
    async findOne(@Param() { id }: { id: string }) {
        return this.podcastsService.findOne(id)
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
}
