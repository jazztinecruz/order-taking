import api from "@/core/api";

const Home = async () => {
  const users = await api.query.users.single();
  return <div>Home</div>;
};

export default Home;
