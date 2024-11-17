import { IsOptional, IsString, IsNumber } from 'class-validator';

export class PodcastDto {
    id: number;
    title: string;
    description: string;
    episodesAmount: number;
    rating?: number;
    lastEpisodeDate?: string;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
}

export class PodcastCreateDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}

export class PodcastUpdateDto {
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    rating: number;
}