import { Inject, Injectable, NotFoundException, } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FindUserUseCase } from '../../domain/usecase/find-user.usecase';
import { USER_MONGO_REPOSITORY } from '../../domain/repository/user.repository';
import type { UserRepository } from '../../domain/repository/user.repository';
import { UserDto } from '../../domain/dto/user.dto';

@Injectable()
export class FindUserImplUseCase implements FindUserUseCase {
  constructor(
    @Inject(USER_MONGO_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  execute(id: string): Observable<UserDto> {
    return this.userRepository.findOne(id).pipe(
      switchMap((user) => {
        if (!user) {
          return throwError(() => new NotFoundException(`User with id ${id} not found`));
        }
        return of(user)
      }),
    );
  }
}
