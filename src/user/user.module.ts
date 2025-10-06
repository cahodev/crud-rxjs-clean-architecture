import { DynamicModule, Module } from '@nestjs/common';
import { UserController } from './infrastructure/controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schema/user.schema';
import { USER_MONGO_REPOSITORY } from './domain/repository/user.repository';
import { UserMongoRepositoryImpl } from './infrastructure/repository/user-mongo-impl.repository';
import { CREATE_USER_USE_CASE } from './domain/usecase/create-user.usecase';
import { CreateUserImplUseCase } from './application/usecase/create-user-impl-use-case.service';
import { UPDATE_USER_USE_CASE } from './domain/usecase/update-user.usecase';
import { UpdateUserImplUseCase } from './application/usecase/update-user-impl-use-case.service';
import { FIND_USER_USE_CASE } from './domain/usecase/find-user.usecase';
import { FindUserImplUseCase } from './application/usecase/find-user-impl.usecase';
import { DELETE_USER_USE_CASE } from './domain/usecase/delete-user.usecase';
import { DeleteUserImplUseCase } from './application/usecase/delete-user-impl.usecase';
import { PASSWORD_SERVICE } from './domain/service/password.service';
import { PasswordService } from './application/service/password-impl.service';

@Module({})
export class UserModule {
  static forRoot(config: any): DynamicModule {
    return {
      module: UserModule,
      imports: [
        MongooseModule.forRoot(config.secretConfig.userMongoDBUri),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
      providers: [
        {
          provide: USER_MONGO_REPOSITORY,
          useClass: UserMongoRepositoryImpl,
        },
        {
          provide: CREATE_USER_USE_CASE,
          useClass: CreateUserImplUseCase,
        },
        {
          provide: UPDATE_USER_USE_CASE,
          useClass: UpdateUserImplUseCase,
        },
        {
          provide: FIND_USER_USE_CASE,
          useClass: FindUserImplUseCase,
        },
        {
          provide: DELETE_USER_USE_CASE,
          useClass: DeleteUserImplUseCase,
        },
        {
          provide: PASSWORD_SERVICE,
          useClass: PasswordService,
        }
      ],
      controllers: [UserController],
    }
  }
}