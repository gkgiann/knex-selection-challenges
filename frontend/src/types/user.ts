export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  avatar: string;
}

export interface RandomUserApiUser {
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
