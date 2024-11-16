import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesService } from './episodes.service';
import { TypeOrmModule } from '@nestjs/typeorm';


import { EpisodeEntity } from './types/episodes.entity';
import { EpisodesController } from './episodes.controller';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([EpisodeEntity])],
    providers: [EpisodesService],
    controllers: [EpisodesController],
    exports: [EpisodesService]
})

export class EpisodesModule { }