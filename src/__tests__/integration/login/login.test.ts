import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { mockedLoginUser, mockedUser } from "../../mocks";

describe("/category", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/profile").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Deve ser capaz de gerar um token quando logar", async () => {
    const response = await request(app).post("/login").send(mockedLoginUser);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toEqual(200);
  });
});
