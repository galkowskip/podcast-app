import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import { SignInWithEmailDto } from './types/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async signIn({ email, password }: SignInWithEmailDto) {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const arePasswordsEqual = !this.usersService.comparePasswords(password, user.password);

        if (arePasswordsEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload = { sub: user.id, username: user.name, role: user.role, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
