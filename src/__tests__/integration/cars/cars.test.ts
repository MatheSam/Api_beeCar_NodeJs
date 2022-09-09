import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";


describe("/cars", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /profile - deve ser capaz de criar um novo usuário", async () => {
    const response = await request(app).post("/profile").send(mockedUser);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("birthDate");
    expect(response.body).toHaveProperty("cpf");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Juarez");
    expect(response.body.email).toEqual("juarez@mail.com");
    expect(response.body.cpf).toEqual("15865335683");
    expect(response.body.isActive).toEqual(true);
    expect(response.body.isAdm).toEqual(false);
    expect(response.status).toBe(201);
  });

  test("POST /profile - não deve ser capaz de criar um usuário que já existe", async () => {
    const response = await request(app).post("/profile").send(mockedUser);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /profile - Must be able to list users", async () => {
    await request(app).post("/users").send(mockedUserAdm);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(2);
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
    expect(response.status).toBe(403);
  });

  test("DELETE /profile - não deve ser capaz de realizar um soft delete sem autenticação", async () => {
    const adminsLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const userTobeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminsLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${userTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /profile -  Must be able to soft delete user", async () => {
    await request(app).post("/users").send(mockedUserAdm);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);
    const UserTobeDeleted = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(findUser.body[0].isActive).toBe(false);
  });
});
