import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import {
  mockedAdmin,
  mockedAttCard,
  mockedCard,
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

  test("POST /profile/card - Deve ser capaz de criar um cartão de crédito para o usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    const response = await request(app)
      .post("/profile/card")
      .send(mockedCard)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.status).toEqual(200);
  });

  test("POST /profile/card - Não deve ser capaz de criar o mesmo cartão de crédito", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    const response = await request(app)
      .post("/profile/card")
      .send(mockedCard)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toEqual(400);
  });

  test("GET /profile/card - Deve ser capaz de listar todos os cartões de crédito do usário", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    const response = await request(app)
      .get("/profile/card")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toEqual(200);
  });

  test("PATCH /profile/card/:id - Deve ser capaz de atualizar o cartão de crédito do usuiário", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    const cards = await request(app)
      .get("/profile/card")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .patch(`/profile/card/${cards.body[0].id}`)
      .send(mockedAttCard)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body.validate).toEqual("10/10/2022");
    expect(response.status).toEqual(200);
  });

  test("DELETE /profile/card/:id - Deve ser capaz de deletar o cartão de crédito", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    const cards = await request(app)
      .get("/profile/card")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const deleting = await request(app)
      .delete(`/profile/card/${cards.body[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .get("/profile/card")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(deleting.status).toEqual(200);
    expect(response).toHaveLength(0);
  });
});
