import { HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { CreateUserResponseDto } from "src/user/dto/create-user-response.dto";
import { UserService } from "src/user/user.service";

export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }
    
    public async register(dto: CreateUserResponseDto) {
        const hashedPassword = await hash(dto.password, 10);
        try {
            const createdUser = await this.userService.create({
                ...dto,
                password: hashedPassword,
            });
            createdUser.password = undefined;

            return createdUser;
        } catch (error) {
            throw new HttpException(
                '알 수 없는 오류가 발생하였습니다.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
          const user = await this.userService.getByEmail(email);
          await this.verifyPassword(plainTextPassword, user.password);
          user.password = undefined;
          return user;
        } catch (error) {
          throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.BAD_REQUEST);
        }
    }
      
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);

        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }
}