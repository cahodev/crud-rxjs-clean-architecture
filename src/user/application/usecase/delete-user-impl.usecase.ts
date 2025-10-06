import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { DeleteUserUseCase } from '../../domain/usecase/delete-user.usecase';
import { USER_MONGO_REPOSITORY } from '../../domain/repository/user.repository';
import type { UserRepository } from '../../domain/repository/user.repository';
import { UserDto } from '../../domain/dto/user.dto';

@Injectable()
export class DeleteUserImplUseCase implements DeleteUserUseCase {
  constructor(
    @Inject(USER_MONGO_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  execute(id: string): Observable<UserDto> {
    return this.userRepository.delete(id).pipe(
      switchMap((user) => {
        if (!user) {
          return throwError(() => new NotFoundException(`User with id ${id} not found`));
        }
        return of(user)
      }),
    );
  }
}
