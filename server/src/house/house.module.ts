import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './house.entity';
import { HouseService } from './house.service';

@Module({
  controllers: [HouseController],
  imports: [TypeOrmModule.forFeature([House])],
  providers: [HouseService],
})
export class HouseModule {
}
