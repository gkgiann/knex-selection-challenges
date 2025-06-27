import { RandomUserApiUser, User } from "@/types/user";

export const convertRandomUserToUser = (
  randomUser: RandomUserApiUser
): User => {
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
