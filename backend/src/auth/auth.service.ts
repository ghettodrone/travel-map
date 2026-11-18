import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}
    
    async login(loginDto: LoginDto){
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return {
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }
}
