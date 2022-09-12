import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import {
  mockedAttCnh,
  mockedCnh,
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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /profile/cnh - Deve ser capaz de criar uma CNH para o usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    const response = await request(app)
      .post("/profile/cnh")
      .send(mockedCnh)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
  });

  test("POST /profile/cnh - Não deve ser capaz de criar duas CNHS iguais para o usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    const response = await request(app)
      .post("/profile/cnh")
      .send(mockedCnh)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toEqual(401);
  });

  test("PATCH /profile/cnh - Deve ser capaz de atualizar a CNH", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    const response = await request(app)
      .patch("/profile/cnh")
      .send(mockedAttCnh)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toEqual(200);
  });

  test("DELETE /profile/cnh - Deve ser capaz de deletar a CNH do usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    const response = await request(app)
      .delete("/profile/cnh")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body.cnh).toEqual(null);
    expect(response.status).toEqual(200);
  });
});
