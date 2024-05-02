import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserResponseDto } from "src/user/dto/create-user-response.dto";
import RequestWithUser from "./interfaces/requestWithUser.interface";
import { LocalAuthGuard } from "./local/localAuthentication.guard";
import { Response } from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    
    @Post('/register')
    async register(@Body() dto: CreateUserResponseDto) {
        return this.authService.register(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() request: RequestWithUser, @Res() response: Response) {
        const { user } = request;
        const cookie = this.authService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;

        return response.send(user);
    }
}