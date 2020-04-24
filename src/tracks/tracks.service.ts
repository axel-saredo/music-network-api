import { Injectable } from '@nestjs/common';

@Injectable()
export class TracksService {
  private tracks = [
    {
      id: 1,
      title: '1st track',
      author: 'Axel Saredo',
      file: 'file-id-1',
      plays: 41230,
      image: 'image-id-1',
    },
    {
      id: 2,
      title: '2nd track',
      author: 'Lean Doldan',
      file: 'file-id-2',
      plays: 890,
      image: 'image-id-2',
    },
    {
      id: 3,
      title: '3rd track',
      author: 'Jorge Leone',
      file: 'file-id-3',
      plays: 2013,
      image: 'image-id-3',
    },
  ];

  getTracks() {
    return this.tracks;
  }
}
