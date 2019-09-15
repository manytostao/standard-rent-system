import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { Manager } from './manager.entity';

@Module({
  controllers: [ManagerController],
  imports: [TypeOrmModule.forFeature([Manager])],
  exports: [ManagerService],
  providers: [ManagerService],
})
export class ManagerModule {
}
