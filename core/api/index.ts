import type { User } from "@prisma/client";
import addUser from "./users/add-user";
import getUsers from "./users/get-multiple";
import getUser from "./users/get-user";

const api = {
  query: {
    users: {
      single: () => getUser(),
      multiple: () => getUsers(),
    },
  },
  mutation: {
    users: {
      add: ({ data }: { data: User }) => addUser({ data }),
      update: ({ data }: { data: User }) => addUser({ data }),
    },
  },
};

export default api;
