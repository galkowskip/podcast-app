import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInWithEmailDto } from './types/auth.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() body: SignInWithEmailDto) {
        return this.authService.signIn(body)
    }
}
