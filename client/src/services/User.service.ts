
import instance from '../utils/axios'; 

interface UserData {
  login: string;
  password: string;
}

interface ApiResponse {
  message: string;
}

interface ApiUser {
  access_token: string;
  requests: string[]
}

class UserApi {
  async registration(userData: UserData): Promise<ApiResponse> {
    try {
      const { data } = await instance.post<ApiResponse>('/users/registration', userData);
      return data;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    }
  }

  async login(userData: UserData): Promise<ApiUser> {
    try {
      const { data } = await instance.post<ApiUser>('/users/login', userData);
      return data;
    } catch (error) {
      console.error('Ошибка входа:', error);
      throw error;
    }
  }


  // async getUser() {
  //   try {
  //     const token = localStorage.getItem('token');

  //     if (!token) {
  //       throw new Error('Токен не найден');
  //     }
  //     const { data } = await instance.get('/', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     return data;
  //   } catch (error) {
  //     console.error('Ошибка при получении данных пользователя:', error);
  //     throw error;
  //   }
  // }
}

export const userApi = new UserApi();
