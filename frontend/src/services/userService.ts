import { RandomUserApiUser, User } from "@/types/user";
import { convertRandomUserToUser } from "@/utils/convertRandomUser";
import axios from "axios";
import Cookies from "js-cookie";

export const userService = {
  getToken: (): string | null => {
    return Cookies.get("auth_token") || null;
  },

  setToken: (token: string): void => {
    Cookies.set("auth_token", token, {
      expires: 7, // 7 dias
      secure: true,
      sameSite: "strict",
    });
  },

  fetchUser: async () => {
    try {
      const response = await axios.get(
        "https://randomuser.me/api/?nat=br&inc=name,email,phone,dob,location,picture,login"
      );

      if (
        !response.data ||
        !response.data.results ||
        !response.data.results[0]
      ) {
        throw new Error("Erro ao buscar usuário da API");
      }

      const randomUser: RandomUserApiUser = response.data.results[0];

      const user = convertRandomUserToUser(randomUser);
      const token = randomUser.login.sha256;

      return {
        user,
        token,
      };
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);

      const fallbackUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        name: "Usuário Teste",
        email: "teste@gianect.com",
        phone: "(11) 99999-9999",
        age: 25,
        location: "São Paulo, SP",
        avatar:
          "https://ui-avatars.com/api/?name=Usuário+Teste&background=4f46e5&color=fff&size=200",
      };

      return {
        user: fallbackUser,
        token:
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      };
    }
  },

  login: async () => {
    const response = await userService.fetchUser();
    userService.setToken(response.token);
    return response;
  },
};
