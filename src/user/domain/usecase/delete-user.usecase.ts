import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';

export const DELETE_USER_USE_CASE = 'DELETE_USER_USE_CASE';

export interface DeleteUserUseCase {
  execute(id: string): Observable<UserDto>;
}