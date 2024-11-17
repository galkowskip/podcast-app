import { IsString, IsOptional } from 'class-validator';

export class UserDto {
    id: number;
    email: string;
    password: string;
    role: string;
    name: string;
    createdAt: string;
    updatedAt: string | null;
    deletedAt: string | null;
}

export class UserCreateDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;

    @IsOptional()
    @IsString()
    role: string;

    @IsString()
    name: string;
}

export class UserUpdateDto {
    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    role: string;

    @IsOptional()
    @IsString()
    name: string;
}