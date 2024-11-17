import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto, UserUpdateDto } from './types/user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post()
    create(@Body() data: UserCreateDto) {
        return this.usersService.create(data)
    }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param() { id }: { id: number }) {
        return this.usersService.findOne(id)
    }

    @Put(':id')
    update(@Param() { id }: { id: number }, @Body() data: UserUpdateDto) {
        return this.usersService.update(id, data)
    }

    @Delete(':id')
    remove(@Param() { id }: { id: number }) {
        return this.usersService.remove(id)
    }
}
