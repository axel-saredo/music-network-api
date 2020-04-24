import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user/user.repository";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt/jwt-payload";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken }
    }

    
    async doesUserExists(authCredentialsDto: AuthCredentialsDto) {
        const user = await this.userRepository.findOne({ email: authCredentialsDto.email });
        return !!user;
    }
}