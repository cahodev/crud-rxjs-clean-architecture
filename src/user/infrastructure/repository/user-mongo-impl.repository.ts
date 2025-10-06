import { UserRepository } from '../../domain/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { from, map, Observable } from 'rxjs';
import { UserDto } from '../../domain/dto/user.dto';
import { UserMapper } from '../mapper/user.mapper';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';

@Injectable()
export class UserMongoRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) {}

  create(user: CreateUserDto): Observable<UserDto> {
    return from(this.userModel.create(user)).pipe(
      map((createdUser) => UserMapper.toDto(createdUser)),
    )
  }

  update(user: UpdateUserDto, id: string): Observable<UserDto | null> {
    return from(this.userModel.findByIdAndUpdate(id, user, { new: true }).exec()).pipe(
      map((updatedUser) => updatedUser ? UserMapper.toDto(updatedUser) : null)
    );
  }

  findOne(userId: string): Observable<UserDto | null> {
    return from(this.userModel.findById(userId).exec()).pipe(
      map((foundUser) => foundUser ? UserMapper.toDto(foundUser): null),
    )
  }

  findByEmailOrNickname(email: string, nickname: string): Observable<UserDto | null> {
    return from(
      this.userModel.findOne({ $or: [{ email }, { nickname }] }).exec()
    ).pipe(
      map(user => user ? UserMapper.toDto(user) : null)
    );
  }

  delete(userId: string): Observable<UserDto | null> {
    return from(this.userModel.findByIdAndDelete(userId).exec()).pipe(
      map((deletedUser) => deletedUser ? UserMapper.toDto(deletedUser): null),
    )
  }
}