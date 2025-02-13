const chai = require('chai');
const supertest = require('supertest');
const app = require('./app');

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

describe("POST /registration", () => {
    it('Успешная регистрация', async () => {
        const response = await request.post("/registration").send(userData)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Пользователь успешно зарегистрирован")
    })

    it("Возвращает ошибку при вводе непольных данных", async () => {
        const response = await request.post('/registration').send({login: userData.login})

        expect(response.status).to.equal(400)
        expect(response.body).to.have.property("errors")
    })

    it("Возвращает ошибку при повторной регистрации пользователя", async () => {
        await request.post('registration').send(userData)

        const response = request.post('registration').send(userData)

        expect(response.status).to.equal(400)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Такой пользователь уже существует")
    })
})

describe("POST /login", () => {
    it("Успешная авторизация", async () => {
        await request.post("/registration").send(userData)

        const response = await request.post("/login").send(userData)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("user")
        expect(response.body.user.login).to.equal(userData.login)
    })

    it("Возвращает ошибку при вводе непольных данных", async () => {
        await request.post('/registration').send(userData)

        const response = await request.post("/login").send({login: userData.login})

        expect(response.status).to.equal(400)
        expect(response.body).to.have.property("errors")
    })

    it("Возвращает ошибку при вводе невалидных данных", async () => {
        await request.post("/registration").send(userData)

        const response = request.post("/login").send({login: userData, password: "tefdgdgdv"})

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Неверный логин или пароль")
    })
})

describe("GET /", () => {
    it("Возвращает данные пользователя", async () => {
        await request.post("/registration").send(userData)
        await request.post("/login").send(userData)

        const response = await request.get("/")

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("user")
        expect(response.body.user.login).to.equal(userData.login)
        expect(response.body.user.requests).to.be.an("array")
    })

    it("Возвращает ошибку если пользователь не авторизован", async () => {
        await request.post("registration").send(userData)
        const response = await request.get("/")

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Пользователь не авторизован!")
    })
})

describe("POST /", () => {
    it("Успешно добавляет запрос в БД", async () => {
        await request.post("registration").send(userData)
        await request.post("/login").send(userData)

        const initialUser = await request.get("/")
        expect(initialUser.status).to.equal(200)
        expect(initialUser.body).to.have.property("user")
        expect(initialUser.body.user.requests).to.be.an("array")
        expect(initialUser.body.user.requests.length).to.equal(0)

        const response = (await request.post("/")).setEncoding(requestData)
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("user")
        expect(response.body.user.requests).to.be.an("array")
        expect(response.body.user.requests.length).to.equal(initialUser.body.user.requests.length + 1)
        expect(response.body.user.requests.at(0)).to.equal(requestData)
    })

    it("Возвращает ошибку если пользователь не авторизован", async () => {
        await request.post("registration").send(userData)
        const response = await request.post("/").send(requestData)

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Пользователь не авторизован!")
    })

    it("Возвращает ошибку при отсутствии обязательных полей", async () => {
        await request.post("registration").send(userData)
        await request.post("/login").send(userData)

        const initialUser = await request.get("/")
        expect(initialUser.status).to.equal(200)
        expect(initialUser.body).to.have.property("user")
        expect(initialUser.body.user.requests).to.be.an("array")

        const response = await request.post("/").send({request: requestData.request})

        expect(response.status).to.equal(400)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Поля 'request', 'name', 'limit' обязательны к заполнению!")
    })
})

describe("DELETE /:id", () => {
    it("Успешно удаляет запрос из БД", async () => {
        await request.post("registration").send(userData)
        await request.post("/login").send(userData)

        const initialUser = await request.get("/")
        expect(initialUser.status).to.equal(200)
        expect(initialUser.body).to.have.property("user")
        expect(initialUser.body.user.requests).to.be.an("array")
        expect(initialUser.body.user.requests.length).to.equal(0)

        const addRequest = (await request.post("/")).setEncoding(requestData)
        expect(addRequest.status).to.equal(200)
        expect(addRequest.body).to.have.property("user")
        expect(addRequest.body.user.requests).to.be.an("array")
        expect(addRequest.body.user.requests.length).to.equal(initialUser.body.user.requests.length + 1)
        expect(addRequest.body.user.requests.at(0)).to.equal(requestData)

        const response = await request.delete(`/${addRequest.body.user.request.at(0).id}`)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("user")
        expect(response.body.user.requests).to.be.an("array")
        expect(response.body.user.requests.length).to.equal(addRequest.body.user.requests.length - 1)
    })

    it("Возвращает ошибку если пользователь не авторизован", async () => {
        await request.post("registration").send(userData)
        const response = await request.delete("/5").send(requestData)

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Пользователь не авторизован!")
    })

    it("Возвращает ошибку если запрос не существует", async () => {
        await request.post("registration").send(userData)
        await request.post("/login").send(userData)

        const initialUser = await request.get("/")
        expect(initialUser.status).to.equal(200)
        expect(initialUser.body).to.have.property("user")
        expect(initialUser.body.user.requests).to.be.an("array")
        expect(initialUser.body.user.requests.length).to.equal(0)

        const addRequest = (await request.post("/")).setEncoding(requestData)
        expect(addRequest.status).to.equal(200)
        expect(addRequest.body).to.have.property("user")
        expect(addRequest.body.user.requests).to.be.an("array")
        expect(addRequest.body.user.requests.length).to.equal(initialUser.body.user.requests.length + 1)
        expect(addRequest.body.user.requests.at(0)).to.equal(requestData)

        const response = await request.delete(`/${addRequest.body.user.request.at(0).id + 1}`)

        expect(response.status).to.equal(404)
        expect(response.body).to.have.property("message")
        expect(response.body.message).to.equal("Такого запроса не существует!")
    })
})