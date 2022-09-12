import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        logging: true,
        synchronize: false,
        entities:
          process.env.NODE_ENV === "production"
            ? ["dist/src/entities/*.js"]
            : ["src/entities/*.ts"],
        migrations:
          process.env.NODE_ENV === "production"
            ? ["dist/src/migrations/*.js"]
            : ["src/migrations/*.ts"],
      }
);

export default AppDataSource;

// import { DataSource } from "typeorm";
// import "dotenv/config";

// const host = process.env.NODE_ENV === "dockerdev" ? "postgres" : "localhost";

// const AppDataSource = new DataSource(
//   process.env.NODE_ENV === "test"
//     ? {
//         type: "sqlite",
//         database: ":memory:",
//         synchronize: true,
//         entities: ["src/entities/*.ts"],
//       }
//     : {
//         type: "postgres",
//         host,
//         port: 5432,
//         username: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB,
//         logging: true,
//         synchronize: false,
//         entities: ["src/entities/*.ts"],
//         migrations: ["src/migrations/*.ts"],
//       }
// );

// export default AppDataSource;
