import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import {
  mockedAdmin,
  mockedAttCategory,
  mockedCategory,
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

  test("POST /category -  Deve ser capaz de criar uma categoria", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);
    const response = await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("directionType");
    expect(response.body).toHaveProperty("powerWindows");
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  test("POST /category -  Não deve ser capaz de criar uma categoria que já existe", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);
    const response = await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  /*   test("POST /category - Não deve ser capaz de criar uma categoria sem autenticação", async () => {
    const response = await request(app).post("/category").send(mockedCategory);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  }); */

  test("POST /category -  Não deve ser capaz de criar uma categoria sem ser administrador", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginUser);
    const response = await request(app)
      .post("/category")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategory);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /category -  Deve ser capaz de listar todas as categorias", async () => {
    const response = await request(app).get("/category");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  /*   test("GET /category/:id/cars -  Deve ser capaz de listar todos os carros de uma categoria especifica", async () => {
    const category = await request(app).get("/category");

    const response = await request(app).get(
      `/category/${category.body[0].id}/cars`
    );

  });

  test("GET /category/:id/cars -  Não deve ser capaz de listar os carros de uma categoria que não existe", async () => {
    const response = await request(app).get(
      `/category/13970660-5dbe-423a-9a9d-5c23b37943cf/cars`
    );
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  }); */

  test("PATCH /category/:id - Deve ser capaz de atualizar dados especificos de uma categoria", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const categories = await request(app).get("/category");

    const response = await request(app)
      .patch(`/category/${categories.body[0].id}`)
      .send(mockedAttCategory)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body.name).toEqual("Categoria Atualizada");
  });

  test("DELETE /category/:id - Deve ser capaz de realizar um soft delete em uma categoria especifica", async () => {
    const adminLogin = await request(app).post("/login").send(mockedLoginAdm);

    const categories = await request(app).get("/category");

    await request(app)
      .delete(`/category/${categories.body[0].id}`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    const response = await request(app).get("/category");

    expect(response.body[0].isActive).toEqual(false);
  });

  test("DELETE /category/:id - Não deve ser capaz de deletar uma categoria que não existe", async () => {
    const adminLogin = await request(app).post("/login").send(mockedLoginAdm);

    const response = await request(app)
      .delete(`/category/46d88ed9-f681-4c05-a5f8-00169e092e60`)
      .set("Authorization", `Bearer ${adminLogin.body.token}`);

    expect(response.status).toEqual(404);
  });

  test("DELETE /category/:id - Não deve ser capaz de deletar se não for administrador", async () => {
    const userLogin = await request(app).post("/login").send(mockedLoginUser);
    const categories = await request(app).get("/category");

    const response = await request(app)
      .delete(`/category/${categories.body[0].id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toEqual(401);
  });
});
