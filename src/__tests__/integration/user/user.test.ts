import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import {
  mockedLoginAdm,
  mockedLoginUser,
  mockedUser,
  mockedUserAdm,
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

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /profile - Must be able to create a user", async () => {
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

  test("POST /profile - should not be able to create a user that already exists", async () => {
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

  test("GET /profile - should not be able to list users without authentication", async () => {
    const response = await request(app).get("/profile");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /profile - should not be able to list users not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginUser);
    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /profile - should not be able to delete user without authentication", async () => {});
});
