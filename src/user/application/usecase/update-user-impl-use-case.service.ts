import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_MONGO_REPOSITORY } from '../../domain/repository/user.repository';
import type { UserRepository } from '../../domain/repository/user.repository';
import { Observable, switchMap, throwError, of } from 'rxjs';
import { UserDto } from '../../domain/dto/user.dto';
import { UpdateUserUseCase } from '../../domain/usecase/update-user.usecase';
import { UpdateUserDto } from '../../domain/dto/update-user.dto';

@Injectable()
export class UpdateUserImplUseCase implements UpdateUserUseCase {
  constructor(@Inject(USER_MONGO_REPOSITORY) private readonly userMongoRepository: UserRepository) {}

  execute(id: string, updateUser: UpdateUserDto): Observable<UserDto> {
    return this.userMongoRepository.findOne(id).pipe(
      switchMap(existingUser => {
        if (!existingUser) {
          return throwError(() => new NotFoundException(`User with id ${id} not found`));
        }

        const { email, nickname } = updateUser;

        if (email || nickname) {
          return this.userMongoRepository.findByEmailOrNickname(email ?? '', nickname ?? '').pipe(
            switchMap(duplicateUser => {
              if (duplicateUser && duplicateUser.id !== id) {
                return throwError(() => new ConflictException('Email or nickname already in use'));
              }
              return this.userMongoRepository.update(updateUser, id).pipe(
                switchMap(updatedUser => {
                  if (!updatedUser) {
                    return throwError(() => new NotFoundException(`User with id ${id} could not be updated`));
                  }
                  return of(updatedUser);
                }),
              );
            }),
          );
        }

        return this.userMongoRepository.update(updateUser, id).pipe(
          switchMap(updatedUser => {
            if (!updatedUser) {
              return throwError(() => new NotFoundException(`User with id ${id} could not be updated`));
            }
            return of(updatedUser);
          }),
        );
      }),
    );
  }
}
