import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const UPDATE_USER_USE_CASE = 'UPDATE_USER_USE_CASE';

export interface UpdateUserUseCase {
  execute(id: string, updateUser: UpdateUserDto): Observable<UserDto>;
}