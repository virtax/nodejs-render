import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    url: process.env['DATABASE_URL'],
    synchronize: false,
    logging: true,
    entities: ['./src/models/*.ts'],
    subscribers: [],
    migrations: ['./src/migrations/*.ts'],
})
