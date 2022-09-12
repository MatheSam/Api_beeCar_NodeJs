import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import {
  mockedAdmin,
  mockedAttUser,
  mockedCard,
  mockedCars,
  mockedCategory,
  mockedCnh,
  mockedLoginAdm,
  mockedLoginUser,
  mockedNewUser,
  mockedRent,
  mockedUser,
} from "../../mocks";

describe("/profile", () => {
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

  test("POST /profile - deve ser capaz de criar um novo usuário", async () => {
    const response = await request(app).post("/profile").send(mockedNewUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("birthDate");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Joab");
    expect(response.body.email).toEqual("joab@mail.com");
    expect(response.body.cpf).toEqual("15865335683");
    expect(response.body.isActive).toEqual(true);
    expect(response.body.isAdm).toEqual(false);
    expect(response.status).toBe(201);
  });

  test("POST /profile - não deve ser capaz de criar um usuário que já existe", async () => {
    const response = await request(app).post("/profile").send(mockedNewUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /profile - Deve ser capaz de listar usuários", async () => {
    await request(app).post("/profile").send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(3);
  });

  test("GET /profile - não deve ser capaz de listar usuários sem autenticação", async () => {
    const response = await request(app).get("/profile");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /profile - não deve ser capaz de listar usuários se não for admnistrador", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginUser);
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /profile/rents - deve ser capaz de retornar todos os carros locados pelo usuário", async () => {
    const admLogin = await request(app).post("/login").send(mockedLoginAdm);
    const userLogin = await request(app).post("/login").send(mockedLoginUser);

    await request(app)
      .post("/profile/card")
      .send(mockedCard)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    await request(app)
      .post("/category")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const car = await request(app)
      .post("/cars")
      .send(mockedCars)
      .set("Authorization", `Beare ${admLogin.body.token}`);

    mockedRent.carId = car.body.id;

    await request(app)
      .post("/rent")
      .send(mockedRent)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .get("/profile/rents")
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveLength(1);
  });

  test("PATCH /profile - deve ser capaz de atualizar os dados do próprio usuário", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);
    const admLogin = await request(app).post("/login").send(mockedLoginAdm);

    await request(app)
      .patch("/profile")
      .send(mockedAttUser)
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.body[0].email).toEqual("juninho@mail.com");
  });

  test("DELETE /profile - não deve ser capaz de realizar um soft delete sem autenticação", async () => {
    await request(app).post("/profile").send(mockedUser);
    const response = await request(app).delete(`/profile`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /profile -  Deve ser capaz de realizar um soft delete", async () => {
    await request(app).post("/profile").send(mockedUser);
    const userLogin = await request(app).post("/login").send(mockedUser);

    const response = await request(app)
      .delete(`/profile`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
