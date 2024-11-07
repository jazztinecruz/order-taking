const ErrorCard = ({ reset }: { reset: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-16 rounded-lg bg-red-100">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Try again
      </button>
    </div>
  );
};

export default ErrorCard;
