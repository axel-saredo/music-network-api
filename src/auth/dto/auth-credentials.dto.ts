import {IsString, MinLength, MaxLength, Matches, IsEmail} from 'class-validator';
import { TypeOfUser } from '../user/type-of-user.enum';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        { message: 'password too weak' }
    )
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    typeOfUser: TypeOfUser;
}