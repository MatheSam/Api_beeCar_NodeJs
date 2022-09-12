import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import {
  mockedAdmin,
  mockedCars,
  mockedCarsUpdated,
  mockedCategory,
  mockedLoginAdm,
  mockedLoginUser,
  mockedUser,
} from "../../mocks";

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

  test("POST /cars - deve ser capaz de criar um novo carro", async () => {
    await request(app).post("/profile").send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);

    const response = await request(app)
      .post("/cars")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCars);

    expect(response.body).toHaveProperty("color");
    expect(response.body).toHaveProperty("model");
    expect(response.body).toHaveProperty("fuel");
    expect(response.body).toHaveProperty("year");
    expect(response.body).toHaveProperty("brand");
    expect(response.status).toBe(201);
  });

  test("POST /cars - não deve ser capaz de criar um carro que já existe", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const response = await request(app)
      .post("/cars")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCars);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /cars - Não deve ser capaz de criar um novo carro sem autenticação", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);
    const response = await request(app)
      .post("/cars")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCars);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /cars - Deve ser capaz de listar carros", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginUser);
    const response = await request(app)
      .get("/cars")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
  });

  test("GET /cars - Deve ser capaz de listar um carro especifico", async () => {
    const cars = await request(app).get("/cars");

    const response = await request(app).get(`/cars/${cars.body[0].id}`);

    const placa = cars.body[0].licensePlate;

    expect(response.body.licensePlate).toEqual(placa);
  });

  test("PATCH /cars - Deve ser capaz de atualizar um carro especifico", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const carsTobeUpdated = await request(app)
      .get("/cars")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/cars/${carsTobeUpdated.body[0].id}`)
      .send(mockedCarsUpdated)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.km).toEqual(8000);
  });

  test("DELETE /cars - Deve ser capaz de realizar um soft delete em um carro", async () => {
    //await request(app).post("/cars").send(mockedCars);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);
    const carsToBeDeleted = await request(app)
      .get("/cars")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/cars/${carsToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findCar = await request(app)
      .get("/cars")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(findCar.body[0].isActive).toBe(false);
  });

  /*   test("DELETE /cars - não deve ser capaz de realizar um soft delete sem autenticação", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const carsToBeDeleted = await request(app)
      .get("/cars")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/cars/${carsToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(401);
  }); */
});
