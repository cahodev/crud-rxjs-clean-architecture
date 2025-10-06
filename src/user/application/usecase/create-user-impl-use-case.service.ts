import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../../domain/usecase/create-user.usecase';
import { USER_MONGO_REPOSITORY } from '../../domain/repository/user.repository';
import type { UserRepository } from '../../domain/repository/user.repository';
import { CreateUserDto } from '../../domain/dto/create-user.dto';
import { Observable, switchMap, throwError } from 'rxjs';
import { UserDto } from '../../domain/dto/user.dto';
import { PASSWORD_SERVICE } from '../../domain/service/password.service';
import { PasswordService } from '../service/password-impl.service';

@Injectable()
export class CreateUserImplUseCase implements CreateUserUseCase {
  constructor(@Inject(USER_MONGO_REPOSITORY)
  private readonly userMongoRepository: UserRepository,
  @Inject(PASSWORD_SERVICE)
  private readonly passwordService: PasswordService,) {
  }
  execute(createUser: CreateUserDto): Observable<UserDto> {
    const {email, nickname, password} = createUser;
    return this.userMongoRepository.findByEmailOrNickname(email, nickname).pipe(
      switchMap(existingUser => {
        if (!!existingUser) {
          return throwError(() => new ConflictException('Email or nickname already exists'));
        }
        return this.passwordService.hashPassword(password).pipe(
          switchMap(hashedPassword =>
            this.userMongoRepository.create({ ...createUser, password: hashedPassword })
          )
        );
      })
    )
  }
}