import { Controller, Get, Post, Put, Delete, Param, UseInterceptors, Body, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFile } from "@nestjs/common";
import { EpisodeCreateDto, EpisodeUpdateDto } from 'src/episodes/types/episodes.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { EpisodesService } from "./episodes.service";

@Controller('podcasts/:podcastId/episodes')
export class EpisodesController {
    constructor(
        private readonly episodesService: EpisodesService,
    ) { }

    @Get('')
    async findEpisodes(@Param() { podcastId }: { podcastId: number }) {
        return this.episodesService.findEpisodesByPodcastId(podcastId)
    }

    @Get(':episodeId')
    async findEpisode(@Param() { podcastId, episodeId }: { podcastId: number, episodeId: number }) {
        return this.episodesService.findOne(podcastId, episodeId)
    }

    @Get('featured')
    async findFeaturedEpisodes(@Param() { podcastId }: { podcastId: number }) {
        return this.episodesService.findFeatured(podcastId)
    }

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async createEpisode(@Param() { podcastId }: { podcastId: number }, @Body() data: EpisodeCreateDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 20 * 1000000 }),
                new FileTypeValidator({ fileType: 'audio/mpeg' }),
            ],
        }),
    ) file: Express.Multer.File) {
        return this.episodesService.createNewEpisode(podcastId, data, file)
    }

    @Put(':episodeId')
    async updateEpisode(@Param() { podcastId, episodeId }: { podcastId: number, episodeId: number }, @Body() data: EpisodeUpdateDto) {
        return this.episodesService.updateEpisode(podcastId, episodeId, data)
    }

    @Delete(':episodeId')
    async deleteEpisode(@Param() { podcastId, episodeId }: { podcastId: number, episodeId: number }) {
        return this.episodesService.deleteEpisode(podcastId, episodeId)
    }
}