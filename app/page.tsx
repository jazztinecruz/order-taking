import api from "@/core/api";

const Home = async () => {
  const users = await api.users.single();
  console.log(users);
  return <div>Home</div>;
};

export default Home;
