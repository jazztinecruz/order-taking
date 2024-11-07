"use client";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className="bg-blue-500 text-white rounded-md p-3 disabled:bg-gray-400 disabled:cursor-not-allowed">
      {children}
    </button>
  );
};

export default Button;
