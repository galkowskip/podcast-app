import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeEntity } from './episodes/types/episodes.entity';
import { PodcastsModule } from './podcasts/podcasts.module';
import { PodcastEntity } from './podcasts/types/podcast.entity';

@Module({
  imports: [
    EpisodesModule,
    TopicsModule,
    PodcastsModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'db',
      port: 1433,
      username: 'sa',
      password: 'YourStrong!Passw0rd',
      entities: [EpisodeEntity, PodcastEntity],
      database: 'podcast-app',
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {


}