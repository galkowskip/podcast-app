import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodeCreateDto, EpisodeUpdateDto } from './types/episodes.dto';

@Controller('episodes')
export class EpisodesController {
    constructor(private readonly episodesService: EpisodesService) {

    }

    @Get()
    async findAll() {
        return await this.episodesService.findAll()
    }

    @Get('featured')
    async findFeatured() {
        return await this.episodesService.findFeatured()
    }

    @Get(':id')
    async findOne(@Param() {id}: {id:string}) {
        try {
            return await this.episodesService.findOne(id)
        } catch (error) {
            return { message: error };
        }
    }

    @Post()
    async create(@Body() input: EpisodeCreateDto) {
        return await this.episodesService.createNewEpisode(input)
    }

    @Delete(':id')
    async delete(@Param() id: string) {
        try {
            return await this.episodesService.deleteEpisode(id)
        } catch (error) {
            return { message: error };
        }
    }

    @Put(':id')
    async update(@Param() id: string, @Body() input: EpisodeUpdateDto) {
        try {
            return await this.episodesService.updateEpisode(id, input)
        } catch (error) {
            return { message: error };
        }
    }
}
