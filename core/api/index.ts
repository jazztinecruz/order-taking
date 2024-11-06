import getUsers from "./users/get-multiple";
import getUser from "./users/get-user";

const api = {
  users: {
    single: () => getUser(),
    multiple: () => getUsers(),
  },
};

export default api;
