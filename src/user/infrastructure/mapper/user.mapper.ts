import { UserDocument } from '../schema/user.schema';
import { UserDto } from '../../domain/dto/user.dto';

export class UserMapper {
  static toDto(userDocument: UserDocument): UserDto {
    return {
      id: userDocument.id,
      nickname: userDocument.nickname,
      email: userDocument.email,
    }
  }
}