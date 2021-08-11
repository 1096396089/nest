import { Module } from '@nestjs/common';
import { AdminuserController } from './adminuser.controller';

@Module({
  controllers: [AdminuserController]
})
export class AdminuserModule {}
