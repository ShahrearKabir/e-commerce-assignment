import { DynamicModule, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env']
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {

  /**
   * Returns a dynamic module that configures the database connection using TypeORM.
   *
   * @return {DynamicModule} The dynamic module object that contains the configuration for the database module.
   */
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_DB_HOST,
          port: +(<string>process.env.POSTGRES_DB_PORT),
          username: process.env.POSTGRES_DB_USER,
          password: process.env.POSTGRES_DB_PASSWORD,
          database: process.env.POSTGRES_DB_NAME,
          entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
          ],
          synchronize: true,
        })
      ]
      // providers: [DynamicSwaggerConfigService],
      // exports: [DynamicSwaggerConfigService],
    };
  }
}