import { Post, Controller, Body, ValidationPipe, UseFilters, ConflictException, } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { HttpExceptionFilter } from "../utils/http-exception-filter";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    @UseFilters(new HttpExceptionFilter())
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        if (await this.authService.doesUserExists(authCredentialsDto)) {
            throw new ConflictException();
        } else {
            this.authService.signUp(authCredentialsDto);
        }
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signIn(authCredentialsDto);
    }
}