import { IsString } from 'class-validator';

export class SignInWithEmailDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}

