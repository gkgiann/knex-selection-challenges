export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  avatar: string;
}

export interface ApiResponse {
  user: User;
  token: string;
}
