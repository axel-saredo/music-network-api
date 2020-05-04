import { Controller, Get, Put, Param, Body, Delete, NotFoundException, UseFilters } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { HttpExceptionFilter } from '../utils/http-exception-filter';

@Controller('api/tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async getTracks() {
    return await this.tracksService.getTracks();
  }

  @Put('/:id')
  @UseFilters(new HttpExceptionFilter())
  async changeTrackTitle(@Param('id') trackId: string, @Body('title') newTitle: string) {
    try {
      await this.tracksService.changeTrackTitleByTrackId(trackId, newTitle);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete('/:id')
  @UseFilters(new HttpExceptionFilter())
  async deleteTrack(@Param('id') trackId: string) {
    return await this.tracksService.deleteTrackById(trackId);
  }
}
