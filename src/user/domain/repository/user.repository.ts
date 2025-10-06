import { CreateUserDto } from '../dto/create-user.dto';
import { Observable } from 'rxjs';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const USER_MONGO_REPOSITORY ='USER_MONGO_REPOSITORY';
export interface UserRepository {
  create(user: CreateUserDto): Observable<UserDto>;
  update(user: UpdateUserDto, id: string): Observable<UserDto | null>;
  findOne(userId: string): Observable<UserDto | null>;
  findByEmailOrNickname(email: string, nickname: string): Observable<UserDto | null>;
  delete(userId: string): Observable<UserDto | null>;
}