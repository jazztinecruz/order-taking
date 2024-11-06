import type { User } from "@prisma/client";

const getUsers = async () => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-users`;

    const users: User[] = await fetch(URL).then((res) => res.json());
    return users;
  } catch (error) {
    console.error(error);
  }
};

export default getUsers;
