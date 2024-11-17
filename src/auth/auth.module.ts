import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      global: true,
      secret: jwtConstants.secret,
    })
  ],
  exports: [AuthService]
})
export class AuthModule { }
