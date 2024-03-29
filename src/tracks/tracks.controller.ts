import { Controller, Get, Put, Param, Body, Delete, NotFoundException, UseFilters, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { HttpExceptionFilter } from '../utils/http-exception-filter';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/tracks')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  async getTracks() {
    return await this.tracksService.getTracks();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  @UseFilters(new HttpExceptionFilter())
  async changeTrackTitle(@Param('id') trackId: string, @Body('title') newTitle: string) {
    try {
      await this.tracksService.changeTrackTitleByTrackId(trackId, newTitle);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @UseFilters(new HttpExceptionFilter())
  async deleteTrack(@Param('id') trackId: string) {
    try {
        return await this.tracksService.deleteTrackById(trackId);
    } catch (error) {
        throw new InternalServerErrorException();
    }
  }
}
