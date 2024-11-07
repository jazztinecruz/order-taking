import Image from "next/image";

const LoadingAnimaton = () => {
  return (
    <div className="animate-spin ">
      <Image src="/loading.jpeg" alt="loading" width={120} height={120} />
    </div>
  );
};

export default LoadingAnimaton;
