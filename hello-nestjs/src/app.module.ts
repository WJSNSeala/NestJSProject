import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import authConfig from './config/authConfig';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationScheme';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1111',
      database: 'test',
      entities: [UserEntity],
      synchronize: false,
      migrations: ['dist/migrations/*{.ts, .js}'],
      migrationsTableName: 'migrations',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
