import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesService } from './episodes.service';
import { TypeOrmModule } from '@nestjs/typeorm';


import { EpisodeEntity } from './types/episodes.entity';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([EpisodeEntity])],
    providers: [EpisodesService],
    exports: [EpisodesService]
})

export class EpisodesModule {}