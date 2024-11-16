import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class EpisodeDto {
    id: number;
    podcastId: number;
    title: string;
    description: string;
    duration: number;
    releaseDate: string;
    featured: boolean;
    episodeNumber: number;
}

export class EpisodeCreateDto {
    @IsInt()
    podcastId: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsInt()
    duration: string;

    @IsString()
    releaseDate: string;

    @IsOptional()
    @IsInt()
    episodeNumber: number;

    @IsOptional()
    @IsBoolean()
    featured: string;
}

export class EpisodeUpdateDto {
    @IsInt()
    podcastId: number;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsInt()
    duration: number;

    @IsOptional()
    @IsString()
    fileUrl: string;

    @IsOptional()
    @IsString()
    releaseDate: string;

    @IsOptional()
    @IsInt()
    episodeNumber: number;

    @IsOptional()
    @IsBoolean()
    featured: boolean;
}