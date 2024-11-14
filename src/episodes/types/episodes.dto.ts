import { IsString, IsInt, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class EpisodeCreateDto {
    @IsInt()
    podcastId: number;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsInt()
    duration: number;

    @IsString()
    releaseDate: string;

    @IsOptional()
    @IsInt()
    episodeNumber: number;

    @IsOptional()
    @IsBoolean()
    featured: boolean;
}

export class EpisodeUpdateDto {

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
    releaseDate: string;

    @IsOptional()
    @IsInt()
    episodeNumber: number;

    @IsOptional()
    @IsBoolean()
    featured: boolean;
}