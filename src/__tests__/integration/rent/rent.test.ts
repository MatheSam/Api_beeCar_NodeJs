import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import {
  mockedAdmin,
  mockedAttRent,
  mockedCars,
  mockedCategory,
  mockedLoginAdm,
  mockedLoginUser,
  mockedRent,
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

    await request(app).post("/profile").send(mockedAdmin);
    await request(app).post("/profile").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /rent - Deve ser capaz de gerar um aluguel", async () => {
    const admLogin = await request(app).post("/login").send(mockedLoginAdm);
    await request(app)
      .post("/category")
      .send(mockedCategory)
      .set("Authorization", `Bearer ${admLogin.body.token}`);
    const car = await request(app)
      .post("/cars")
      .send(mockedCars)
      .set("Authorization", `Beare ${admLogin.body.token}`);

    mockedRent.carId = car.body.id;

    const userLogin = await request(app).post("/login").send(mockedLoginUser);
    const response = await request(app)
      .post("/rent")
      .send(mockedRent)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
  });

  test("GET /rent - Deve ser capaz de listar todos os carros locados", async () => {
    const admLogin = await request(app).post("/login").send(mockedLoginAdm);
    const response = await request(app)
      .get("/rent")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    expect(response.body).toHaveLength(1);
  });

  test("PATCH /rent/:id - Deve ser capaz de atualizar uma locação especifica", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);
    const admLogin = await request(app).post("/login").send(mockedLoginAdm);
    const rents = await request(app)
      .get("/rent")
      .set("Authorization", `Bearer ${admLogin.body.token}`);

    const response = await request(app)
      .patch(`/rent/${rents.body[0].id}`)
      .send(mockedAttRent)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body.finalHour).toEqual("15:45");
    expect(response.status).toEqual(200);
  });
});
