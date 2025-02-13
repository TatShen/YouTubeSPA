const chai = require('chai');
const supertest = require('supertest');
const app = require('../server');

const expect = chai.expect;
const request = supertest(app);

const userData = {
    login: "tets@mail.ru",
    password: "test1234"
}

const requestData = {
    request: "test",
    name: "test",
    sort: "test",
    limit: 20
}

describe("POST /api/users/registration", () => {
    it('Успешная регистрация', async () => {
        const response = await request.post("//api/users/registration").send(userData)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Пользователь успешно зарегистрирован!")
    })

    it("Возвращает ошибку при вводе неполных данных", async () => {
        const response = await request.post('/api/users/registration').send({login: userData.login})

        expect(response.status).to.equal(400)
        expect(response.body).to.have.property("errors")
    })

    it("Возвращает ошибку при повторной регистрации пользователя", async () => {
        await request.post('/api/users/registration').send(userData)

        const response = request.post('/api/users/registration').send(userData)

        expect(response.status).to.equal(400)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Такой пользователь уже существует")
    })
})

describe("POST /api/users/login", () => {
    it("Успешная авторизация", async () => {
        await request.post("/api/users/registration").send(userData)

        const response = await request.post("/api/users/login").send(userData)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("access_token")
    })

    it("Возвращает ошибку при вводе неполных данных", async () => {
        await request.post('/api/users/registration').send(userData)

        const response = await request.post("/api/users/login").send({login: userData.login})

        expect(response.status).to.equal(400)
        expect(response.body).to.have.property("errors")
    })

    it("Возвращает ошибку при вводе невалидных данных", async () => {
        await request.post("/api/users/registration").send(userData)

        const response = request.post("/api/users/login").send({login: userData, password: "tefdgdgdv"})

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Неверный логин или пароль")
    })
})

describe("GET /api/users/", () => {
    it("Возвращает данные пользователя", async () => {
        await request.post("/api/users/registration").send(userData)
        await request.post("/api/users/login").send(userData)

        const response = await request.get("/api/users/")

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("user")
        expect(response.body.user.login).to.equal(userData.login)
        expect(response.body.user.requests).to.be.an("array")
    })

    it("Возвращает ошибку если пользователь не авторизован", async () => {
        await request.post("api/users/registration").send(userData)
        const response = await request.get("api/users/")

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Пользователь не авторизован!")
    })
})

describe("POST /api/users/", () => {
    it("Успешно добавляет запрос в БД", async () => {
        await request.post("/api/users/registration").send(userData)
        await request.post("/api/users/login").send(userData)

        const initialUser = await request.get("/api/users/")
        expect(initialUser.status).to.equal(200)
        expect(initialUser.body).to.have.property("user")
        expect(initialUser.body.user.requests).to.be.an("array")
        expect(initialUser.body.user.requests.length).to.equal(0)

        const response = (await request.post("/api/users/")).setEncoding(requestData)
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("user")
        expect(response.body.user.requests).to.be.an("array")
        expect(response.body.user.requests.length).to.equal(initialUser.body.user.requests.length + 1)
        expect(response.body.user.requests.at(0)).to.equal(requestData)
    })

    it("Возвращает ошибку если пользователь не авторизован", async () => {
        await request.post("/api/users/registration").send(userData)
        const response = await request.post("/api/users/").send(requestData)

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Пользователь не авторизован!")
    })

    it("Возвращает ошибку при отсутствии обязательных полей", async () => {
        await request.post("/api/users/registration").send(userData)
        await request.post("/api/users/login").send(userData)

        const initialUser = await request.get("/api/users/")
        expect(initialUser.status).to.equal(200)
        expect(initialUser.body).to.have.property("user")
        expect(initialUser.body.user.requests).to.be.an("array")

        const response = await request.post("/api/users/").send({request: requestData.request})

        expect(response.status).to.equal(400)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Поля 'request', 'name', 'limit' обязательны к заполнению!")
    })
})

describe("DELETE /api/users/:id", () => {
    it("Успешно удаляет запрос из БД", async () => {
        await request.post("/api/users/registration").send(userData)
        await request.post("/api/users/login").send(userData)

        const initialUser = await request.get("/api/users/")
        expect(initialUser.status).to.equal(200)
        expect(initialUser.body).to.have.property("user")
        expect(initialUser.body.user.requests).to.be.an("array")
        expect(initialUser.body.user.requests.length).to.equal(0)

        const addRequest = (await request.post("/api/users/")).setEncoding(requestData)
        expect(addRequest.status).to.equal(200)
        expect(addRequest.body).to.have.property("user")
        expect(addRequest.body.user.requests).to.be.an("array")
        expect(addRequest.body.user.requests.length).to.equal(initialUser.body.user.requests.length + 1)
        expect(addRequest.body.user.requests.at(0)).to.equal(requestData)

        const response = await request.delete(`/api/users/${addRequest.body.user.request.at(0).id}`)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("user")
        expect(response.body.user.requests).to.be.an("array")
        expect(response.body.user.requests.length).to.equal(addRequest.body.user.requests.length - 1)
    })

    it("Возвращает ошибку если пользователь не авторизован", async () => {
        await request.post("/api/users/registration").send(userData)
        const response = await request.delete("/api/users/5").send(requestData)

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Пользователь не авторизован!")
    })

    it("Возвращает ошибку если запрос не существует", async () => {
        await request.post("/api/users/registration").send(userData)
        await request.post("/api/users/login").send(userData)

        const initialUser = await request.get("/api/users/")
        expect(initialUser.status).to.equal(200)
        expect(initialUser.body).to.have.property("user")
        expect(initialUser.body.user.requests).to.be.an("array")
        expect(initialUser.body.user.requests.length).to.equal(0)

        const addRequest = (await request.post("/api/users/")).setEncoding(requestData)
        expect(addRequest.status).to.equal(200)
        expect(addRequest.body).to.have.property("user")
        expect(addRequest.body.user.requests).to.be.an("array")
        expect(addRequest.body.user.requests.length).to.equal(initialUser.body.user.requests.length + 1)
        expect(addRequest.body.user.requests.at(0)).to.equal(requestData)

        const response = await request.delete(`/api/users/${addRequest.body.user.request.at(0).id + 1}`)

        expect(response.status).to.equal(404)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Такого запроса не существует!")
    })
})