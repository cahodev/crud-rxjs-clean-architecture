import { CreateUserDto } from '../dto/create-user.dto';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';

export const CREATE_USER_USE_CASE = 'CREATE_USER_USE_CASE';

export interface CreateUserUseCase {
  execute(createUser: CreateUserDto): Observable<UserDto>;
}