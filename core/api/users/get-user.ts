import type { User } from "@prisma/client";

const getUser = async () => {
  try {
    const staticId = "cm35k2ven0000tkh09ho22h2n";
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-user?id=${staticId}`;

    const user: User = await fetch(URL).then((res) => res.json());
    return user;
  } catch (error) {
    console.error(error);
  }
};

export default getUser;
