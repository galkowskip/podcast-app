import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { TypeOrmModule } from '@nestjs/typeorm';


import { EpisodeEntity } from './types/episodes.entity';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([EpisodeEntity])],
    controllers: [EpisodesController],
    providers: [EpisodesService]
})

export class EpisodesModule {

}
