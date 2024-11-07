import toast from "react-hot-toast";

const grabError = (error: Error) => {
  const errorMessage = error.message as string;

  if (errorMessage.includes("already exists")) {
    toast.error(errorMessage);
  } else {
    toast.error("An error occurred while adding the customer");
    console.error(errorMessage);
  }
};

export default grabError;
