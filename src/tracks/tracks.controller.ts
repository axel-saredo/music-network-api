import { Controller, Get } from '@nestjs/common';
import { TracksService } from './tracks.service';

@Controller('tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  getTracks() {
    return this.tracksService.getTracks();
  }
}
