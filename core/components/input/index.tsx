"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  if (props.type === "checkbox") {
    return (
      <div className="flex items-center gap-2">
        <input
          id={id}
          {...props}
          className="p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <label htmlFor={id}>{label}</label>
        {props.required && <span className="text-red-500">*</span>}
      </div>
      <input
        id={id}
        {...props}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Input;
