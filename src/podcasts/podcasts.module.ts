import { Module } from '@nestjs/common';
import { PodcastsController } from './podcasts.controller';
import { PodcastsService } from './podcasts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastEntity } from './types/podcast.entity';
import { EpisodesModule } from 'src/episodes/episodes.module';

@Module({
    imports: [EpisodesModule, TypeOrmModule.forFeature([PodcastEntity])],
    controllers: [PodcastsController],
    providers: [PodcastsService]
})

export class PodcastsModule { }
