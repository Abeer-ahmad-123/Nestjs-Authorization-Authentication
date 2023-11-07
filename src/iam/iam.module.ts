import { Module } from '@nestjs/common';
import { HasingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';

@Module({
  providers: [{ provide: HasingService, useClass: BcryptService }],
})
export class IamModule {}
