import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { EpisodesService } from './episodes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';


import { EpisodeEntity } from './types/episodes.entity';
import { EpisodesController } from './episodes.controller';

@Module({
    imports: [ConfigModule, AuthModule, TypeOrmModule.forFeature([EpisodeEntity])],
    providers: [EpisodesService,],
    controllers: [EpisodesController],
    exports: [EpisodesService],
})

export class EpisodesModule { }