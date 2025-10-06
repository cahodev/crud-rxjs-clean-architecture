import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CREATE_USER_USE_CASE } from '../../domain/usecase/create-user.usecase';
import type { CreateUserUseCase } from '../../domain/usecase/create-user.usecase';
import { UPDATE_USER_USE_CASE } from '../../domain/usecase/update-user.usecase';
import type { UpdateUserUseCase } from '../../domain/usecase/update-user.usecase';
import { FIND_USER_USE_CASE } from '../../domain/usecase/find-user.usecase';
import type { FindUserUseCase } from '../../domain/usecase/find-user.usecase';
import { DELETE_USER_USE_CASE } from '../../domain/usecase/delete-user.usecase';
import type { DeleteUserUseCase } from '../../domain/usecase/delete-user.usecase';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';
import { UserDto } from '../../domain/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: CreateUserUseCase,

    @Inject(UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: UpdateUserUseCase,

    @Inject(FIND_USER_USE_CASE)
    private readonly findUserUseCase: FindUserUseCase,

    @Inject(DELETE_USER_USE_CASE)
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  create(@Body() createUser: CreateUserDto): Observable<UserDto> {
    return this.createUserUseCase.execute(createUser);
  }

  @Get(':id')
  find(@Param('id') id: string): Observable<UserDto> {
    return this.findUserUseCase.execute(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): Observable<UserDto> {
    return this.updateUserUseCase.execute(id, updateUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<UserDto> {
    return this.deleteUserUseCase.execute(id);
  }
}
