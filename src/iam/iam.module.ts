import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';

@Module({
  imports: [
    //made user repo available to authentication service
    TypeOrmModule.forFeature([User]),
    //jwt config is out name space configuration factory,, this method converts factory to match the excepted async odules configuration objects with imports , use gactory etc
    JwtModule.registerAsync(jwtConfig.asProvider()),
    // to use jwt keys
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AccessTokenGuard,
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
