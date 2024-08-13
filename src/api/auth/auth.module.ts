import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/libs/connections/database.module';
import { MainDBModel } from 'src/libs/connections/main-db';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    DatabaseModule.mainDbModules([MainDBModel.User]),
    PassportModule,
    UserModule,

    JwtModule.register({
      secret: 'ewrfjdsuDULJTEkfnkfdjgd8t4nfdGHFF90',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
