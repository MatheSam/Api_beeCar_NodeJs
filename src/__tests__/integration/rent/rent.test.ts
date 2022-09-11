/* test("GET /profile/cars - deve ser capaz de retornar todos os carros locados pelo usuário", async () => {
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
 */
