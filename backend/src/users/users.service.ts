import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    //////////////////////////////////////

    constructor(private readonly prisma: PrismaService) {}

    //////////////////////////////////////
    
    async create(createUserDto: CreateUserDto){
        const { email, password, firstName, lastName } = createUserDto;

        const existingUser = await this.prisma.user.findUnique({
            where: {email},
        })

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName,
                lastName,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            }
        });

        return user;
    }

    //////////////////////////////////////

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            },
        })
    }

    //////////////////////////////////////

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {id},
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
