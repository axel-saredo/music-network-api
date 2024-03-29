import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password, email, firstName, lastName, typeOfUser } = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.typeOfUser = typeOfUser;

        await user.save();
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}