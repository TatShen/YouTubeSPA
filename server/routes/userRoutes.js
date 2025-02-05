const express = require("express")
const router = express.Router()
const {validateBodyUser} = require("./validate")
const authenticateToken = require("../middleware/authMiddleware")
const userControllers = require("../controllers/userControllers")

/**
 * @swagger
 * /api/registration:
 *    post:
 *      summary: Регистрация 
 *      description: Регистрация нового пользователя
 *      tags:
 *        - User
 *      requestBody:
 *        $ref: "#/components/requestBodies/User"
 *      responses:
 *        200:
 *          description: Пользователь создан
 *        500:
 *          description: Ошибка сервера
 * components:
 *   requestBodies:
 *     User:
 *       description: Данные пользователя
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: qwerty
 *                 description: Логин пользователя
 *               password:
 *                 type: string
 *                 example: qwerty1234
 *                 description: Пароль для входа
 */

router.post("/registration", validateBodyUser, userControllers.registration)

/**
 * @swagger
 * /api/login:
 *    post:
 *      summary: Авторизация 
 *      description: Авторизация пользователя
 *      tags:
 *        - User
 *      requestBody:
 *        $ref: "#/components/requestBodies/User"
 *      responses:
 *        200:
 *          description: Вxод успешно выполнен
 *        401:
 *          description: Неверный логин или пароль
 *        500:
 *          description: Ошибка сервера
 * components:
 *   requestBodies:
 *     User:
 *       description: Данные пользователя
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 example: qwerty
 *                 description: Логин пользователя
 *               password:
 *                 type: string
 *                 example: qwerty1234
 *                 description: Пароль для входа
 */

router.post("/login",validateBodyUser, userControllers.login)

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Получить информацию о запросах пользователя
 *     description: Получение списка запросов из базы данных.
 *     tags:
 *       - Requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Получаем данные запросов пользователей
 *       401:
 *         description: Пользователь не авторизован
 *       500:
 *         description: Ошибка сервера
 */

router.get("/", authenticateToken, userControllers.getUser)

/**
 * @swagger
 * /api/:
 *    post:
 *      summary: Добавление запроса 
 *      description: Сохраняет запрос пользователя в базу данных
 *      tags:
 *        - Requests
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *        $ref: "#/components/requestBodies/Request"
 *      responses:
 *        200:
 *          description: Запрос сохранен
 *        401:
 *          description: НПользователь не авторизован
 *        500:
 *          description: Ошибка сервера
 * components:
 *   requestBodies:
 *     Request:
 *       description: Содержание запроса
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request:
 *                 type: string
 *                 example: qwerty
 *                 description: Содержание запроса
 *               name:
 *                 type: string
 *                 example: example
 *                 description: Название запроса
 *               sort:
 *                 type: string
 *                 example: date
 *                 description: Критерий сотртировки результатов запроса 
 *               limit:
 *                 type: integer
 *                 example: 10
 *                 description: Максимальное количество видео получаемых по запросу
 */

router.post("/", authenticateToken, userControllers.addRequest)

/**
 * @swagger
 * /api/{id}:
 *    delete:
 *      summary: Удалить запрос
 *      description: Удаление запроса из базы данных
 *      tags:
 *        - Requests
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: Запрос успешно удален
 *        401:
 *          description: Пользователь не авторизован
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 */

router.delete("/:id", authenticateToken, userControllers.deleteRequest)

module.exports = router