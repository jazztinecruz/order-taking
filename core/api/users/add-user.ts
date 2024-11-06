import type { User } from "@prisma/client";

const addUser = async ({ data }: { data: User }) => {
  try {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/add-user`;

    const users: User[] = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({ data }),
    }).then((res) => res.json());
    return users;
  } catch (error) {
    console.error(error);
  }
};

export default addUser;
