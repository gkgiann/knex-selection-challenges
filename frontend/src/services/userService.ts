import { ApiResponse, User } from "@/types/user";
import Cookies from "js-cookie";

interface RandomUserApiUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  dob: {
    age: number;
  };
  location: {
    city: string;
    state: string;
  };
  picture: {
    large: string;
  };
  login: {
    uuid: string;
    sha256: string;
  };
}

const convertRandomUserToUser = (randomUser: RandomUserApiUser): User => {
  const state = randomUser.location.state;

  return {
    id: randomUser.login.uuid,
    name: `${randomUser.name.first} ${randomUser.name.last}`,
    email: randomUser.email,
    phone: randomUser.phone,
    age: randomUser.dob.age,
    location: `${randomUser.location.city}, ${state}`,
    avatar: randomUser.picture.large,
  };
};

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

  fetchUser: async (): Promise<ApiResponse> => {
    try {
      const response = await fetch(
        "https://randomuser.me/api/?nat=br&inc=name,email,phone,dob,location,picture,login"
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar usuário da API");
      }

      const data = await response.json();
      const randomUser: RandomUserApiUser = data.results[0];

      console.log(data);

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

  login: async (): Promise<ApiResponse> => {
    const response = await userService.fetchUser();
    userService.setToken(response.token);
    return response;
  },
};
