const request = require("supertest");
const app = require("../server");

describe("UserServices test", () => {
  const userData = {
    login: "test@mail.ru",
    password: "test1234",
  };

  const requestData = {
    request: "test",
    name: "test",
    sort: "test",
    limit: 20,
  };


  afterEach(async () => {
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send(userData);

    const token = loginResponse.body.access_token;
    await request(app)
      .delete("/api/users/delete")
      .set("Authorization", `Bearer ${token}`);
  });

  test("Успешная регистрация", async () => {
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Пользователь успешно зарегистрирован!"
    );
  });

  test("Ошибка при вводе неполных данных", async () => {
    const response = await request(app)
      .post("/api/users/registration")
      .send({ login: "sgdgdgd" });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("Ошибка при повторной регистрации", async () => {
    await request(app).post("/api/users/registration").send(userData);
    const response = await request(app)
      .post("/api/users/registration")
      .send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Такой пользователь уже существует"
    );
  });

  test("Успешная авторизация", async () => {
    await request(app).post("/api/users/registration").send(userData);
    const response = await request(app).post("/api/users/login").send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });

  test("Ошибка при вводе неполных данных при авторизации", async () => {
    await request(app).post("/api/users/registration").send(userData);
    const response = await request(app)
      .post("/api/users/login")
      .send({ login: userData.login });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("Ошибка при неверных данных", async () => {
    await request(app).post("/api/users/registration").send(userData);
    const response = await request(app)
      .post("/api/users/login")
      .send({ login: userData.login, password: "wrongpass" });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Неверный логин или пароль"
    );
  });

  test("Получение данных пользователя", async () => {
    await request(app).post("/api/users/registration").send(userData);
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send(userData);
    const token = loginResponse.body.access_token;
    const response = await request(app)
      .get("/api/users/")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.login).toBe(userData.login);
    expect(Array.isArray(response.body.user.requests)).toBe(true);
  });

  test("Ошибка при неавторизованном доступе", async () => {
    const response = await request(app).get("/api/users/");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Пользователь не авторизован!"
    );
  });

  test("Успешное добавление запроса", async () => {
    await request(app).post("/api/users/registration").send(userData);
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send(userData);

    const token = loginResponse.body.access_token;
    const response = await request(app)
      .post("/api/users/")
      .set("Authorization", `Bearer ${token}`)
      .send(requestData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.requests).toContainEqual(
      expect.objectContaining(requestData)
    );
  });

  test("Ошибка при добавлении запроса без авторизации", async () => {
    const response = await request(app).post("/api/users/").send(requestData);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Пользователь не авторизован!"
    );
  });

  test("Успешное удаление запроса", async () => {
    console.log("Успешное удаление запроса")
    await request(app).post("/api/users/registration").send(userData);
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send(userData);

    const token = loginResponse.body.access_token;
    const addRequest = await request(app)
      .post("/api/users/")
      .set("Authorization", `Bearer ${token}`)
      .send(requestData);
      console.log( addRequest.body.user.requests)
    const requestId = addRequest.body.user.requests[0].id;

    const deleteResponse = await request(app)
      .delete(`/api/users/requests/${requestId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.user.requests).not.toContainEqual(
      expect.objectContaining({ id: requestId })
    );
  });

  test("Ошибка при удалении запроса без авторизации", async () => {
    const response = await request(app).delete("/api/users/requests/5");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Пользователь не авторизован!"
    );
  });

  test("Ошибка при удалении несуществующего запроса", async () => {
    await request(app).post("/api/users/registration").send(userData);
    const loginResponse = await request(app)
      .post("/api/users/login")
      .send(userData);

    const token = loginResponse.body.access_token;

    const response = await request(app)
      .delete("/api/users/requests/9999")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "Такого запроса не существует!"
    );
  });
});
