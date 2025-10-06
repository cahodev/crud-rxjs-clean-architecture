import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class AppModule {
  static forRoot(config: any): DynamicModule {
    return {
      module: AppModule,
      controllers: [AppController],
      imports: [
        ConfigModule.forRoot({
        load:[() => config.secretConfig],
        isGlobal: true,
        }),
        UserModule.forRoot(config)],
      providers: [],
    }
  }
}
