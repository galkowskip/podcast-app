import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './types/user.entity';
import { Not, Repository } from 'typeorm';
import { UserCreateDto, UserUpdateDto } from './types/user.dto';

import { hash, compare } from 'bcrypt'
import { promisify } from 'util';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async create(data: UserCreateDto) {
        const newUser = new UserEntity()

        if (data.password !== data.confirmPassword) {
            throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST)
        }

        const emailIsInUse = await this.findByEmail(data.email)

        if (emailIsInUse) {
            throw new HttpException('Email is already in use', HttpStatus.BAD_REQUEST)
        }

        const usernameIsInUse = await this.findByName(data.name)

        if (usernameIsInUse) {
            throw new HttpException('Username is already in use', HttpStatus.BAD_REQUEST)
        }

        // TODO: hash password
        const passwordHash = await this.hashPassword(data.password)

        newUser.password = passwordHash
        newUser.email = data.email
        newUser.role = data.role || 'user'
        newUser.name = data.name
        newUser.createdAt = String(new Date().getTime());

        try {
            return this.userRepository.save(newUser)
        } catch (error) {
            throw new HttpException(`Error creating user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findAll() {
        try {
            return await this.userRepository.find({ where: { deletedAt: Not(null) } })
        } catch (error) {
            throw new HttpException(`Error finding users: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findOne(id: number) {
        try {
            return await this.userRepository.findOne({ where: { id, deletedAt: Not(null) } })
        } catch (error) {
            throw new HttpException(`Error finding user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update(id: number, data: UserUpdateDto) {
        try {
            return await this.userRepository.update({ id }, data)
        } catch (error) {
            throw new HttpException(`Error updating user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async remove(id: number) {
        try {
            return await this.userRepository.softDelete({ id })
        } catch (error) {
            throw new HttpException(`Error deleting user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findByEmail(email: string) {
        try {
            return await this.userRepository.findOne({ where: { email, deletedAt: Not(null) } })
        } catch (error) {
            throw new HttpException(`Error finding user by email: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findByName(name: string) {
        try {
            return await this.userRepository.findOne({ where: { name, deletedAt: Not(null) } })
        } catch (error) {
            throw new HttpException(`Error finding user by name: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async hashPassword(password: string) {
        const saltRounds = 10

        try {
            const hashedPassword = await promisify(hash)(password, saltRounds)

            return hashedPassword
        } catch (error) {
            throw new HttpException('Error hashing password', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async comparePasswords(password: string, hashedPassword: string) {
        try {
            const isMatch = await compare(password, hashedPassword)

            return isMatch
        } catch (error) {
            throw new HttpException('Error comparing passwords', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
