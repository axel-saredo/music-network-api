import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackRepository } from './track.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrackRepository]),
],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
