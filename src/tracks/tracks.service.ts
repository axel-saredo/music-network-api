import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackRepository } from './track.repository';
import { File } from '../file/file.entity';
import { Track } from './track.entity';

@Injectable()
export class TracksService {
    constructor(
      @InjectRepository(TrackRepository)
      private trackRepository: TrackRepository,
    ) {}

    async getTracks() {
      return await this.trackRepository.find();
    }

    async changeTrackTitleByTrackId(id: string, newTitle: string) {
      const track =  await this.trackRepository.findOne(id);
      
      track.title = newTitle;
      track.save();

      return track;
    }

    async deleteTrackById(id: string) {
      try {
        const track = await this.trackRepository.findOne(id);

        this.deleteTrackPicture(track);
        this.deleteTrackAudio(track);

        if (track) {
          await Track.delete(id);
        }
      } catch (error) {
          throw new InternalServerErrorException();
      }
    }

    private async deleteTrackPicture(track: Track) {
      if (track) {
        await File.delete(track.pictureId);
      }

      return;
    }

    private async deleteTrackAudio(track: Track) {
      if (track) {
        await File.delete(track.audioId);
      }

      return;
    }
}
