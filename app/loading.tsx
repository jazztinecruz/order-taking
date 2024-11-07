import LoadingAnimaton from "@/core/components/loading";

const CustomersLoadingPage = () => {
  return (
    <div className="space-y-4 h-screen">
      <div className="w-full h-full grid place-items-center">
        <LoadingAnimaton />
      </div>
    </div>
  );
};

export default CustomersLoadingPage;
