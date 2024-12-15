import { ConfigModule, registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';
// import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';

// import InitSeeder from '../seeds/init.seeder';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const config = {
  // type: 'postgres',
  // host: process.env.MYSQL_HOSTNAME_AUTH || 'localhost',
  // port: parseInt(String(process.env.MYSQL_PORT_AUTH), 10) || 3306,
  // username: process.env.MYSQL_USERNAME_AUTH,
  // password: process.env.MYSQL_PASSWORD_AUTH,
  // database: process.env.MYSQL_DB_AUTH,
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST,
  port: +(<string>process.env.POSTGRES_DB_PORT),
  username: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: [__dirname + '/../../src/**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../migrations/**/*.ts'],
  //   seeds: [InitSeeder],
};

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
// export const source = new DataSource(
//   options as DataSourceOptions & SeederOptions,
// );