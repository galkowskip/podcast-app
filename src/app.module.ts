import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeEntity } from './episodes/types/episodes.entity';
import { PodcastsModule } from './podcasts/podcasts.module';
import { PodcastEntity } from './podcasts/types/podcast.entity';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/types/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EpisodesModule,
    TopicsModule,
    PodcastsModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [EpisodeEntity, PodcastEntity, UserEntity],
      database: 'podcast-app',
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {


}