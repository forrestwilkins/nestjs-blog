import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/**/*.entity{.ts,.js}"],
  synchronize: process.env.NODE_ENV === "development",
  keepConnectionAlive: true,
};

export default config;
