import { Controller, Get, Param, Post, Body, UseFilters, NotFoundException, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Track } from '../tracks/track.entity';
import { HttpExceptionFilter } from '../utils/http-exception-filter';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/:id')
    @UseFilters(new HttpExceptionFilter())
    async getUser(@Param('id') id: string) {
        try {
            return await this.usersService.getUserById(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Get('/:id/tracks')
    @UseFilters(new HttpExceptionFilter())
    async getTracksByUserId(@Param('id') id: string) {
        return await this.usersService.getTracksByUserId(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/:id/track')
    @UseFilters(new HttpExceptionFilter())
    async createTrack(@Param('id') authorId: string, @Body() trackData: Partial<Track>) {
        try {
            return await this.usersService.createTrack(authorId, trackData);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id/description')
    @UseFilters(new HttpExceptionFilter())
    async addProfileDescription(@Param('id') userId: string, @Body('description') description: string) {
        try {
            return await this.usersService.addProfileDescription(userId, description);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
