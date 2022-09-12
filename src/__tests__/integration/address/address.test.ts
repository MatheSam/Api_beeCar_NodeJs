import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import {
  mockedAddress,
  mockedAdmin,
  mockedAttAddress,
  mockedLoginAdm,
  mockedLoginUser,
  mockedUser,
} from "../../mocks";

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
    await request(app).post("/profile").send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /profile/address - Deve ser capaz de criar um endereço para o usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);
    const response = await request(app)
      .post("/profile/address")
      .send(mockedAddress)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
  });

  test("POST /profile/address - Não deve ser capaz de criar mais de um endereço para o usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);
    const response = await request(app)
      .post("/profile/address")
      .send(mockedAddress)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toEqual(401);
  });

  test("PATCH /profile/address - Deve ser capaz de atualizar um endereço", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);
    const admLogin = await request(app).post("/login").send(mockedLoginAdm);
    await request(app)
      .patch("/profile/address")
      .send(mockedAttAddress)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.status).toEqual(200);
    expect(response.body[0].address.number).toEqual("50");
  });
});
