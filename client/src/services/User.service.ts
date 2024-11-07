import { IRequest } from "../redux/actions/userAction";
import { instance } from "../utils/axios";

interface IUserData {
  login: string;
  password: string;
}

interface IApiResponse {
  message: string;
}

interface IApiUser {
  access_token: string;
  requests: string[];
}

class UserApi {
  async registration(userData: IUserData): Promise<IApiResponse> {
    try {
      const { data } = await instance.post<IApiResponse>(
        "/registration",
        userData
      );
      return data;
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      throw error;
    }
  }

  async login(userData: IUserData): Promise<IApiUser> {
    try {
      const { data } = await instance.post<IApiUser>("/login", userData);
      return data;
    } catch (error) {
      console.error("Ошибка входа:", error);
      throw error;
    }
  }

  async getUser() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Токен не найден");
      }
      const { data } = await instance.get("/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      throw error;
    }
  }

  async addRequest(value: IRequest) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Токен не найден");
      }
      const { data } = await instance.post("/", value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      console.error("Ошибка при сохранении запроса:", error);
      throw error;
    }
  }
}

export const userApi = new UserApi();
