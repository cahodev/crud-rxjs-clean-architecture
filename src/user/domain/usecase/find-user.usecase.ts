import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';

export const FIND_USER_USE_CASE = 'FIND_USER_USE_CASE';

export interface FindUserUseCase {
  execute(id: string): Observable<UserDto>;
}