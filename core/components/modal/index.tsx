"use client";

type Props = {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ children, title, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center m-0 z-50">
      <div className="bg-white p-6 rounded-lg shadow border w-full max-w-3xl space-y-4 ">
        <button onClick={onClose} className="hover:underline">
          x Close
        </button>
        <h2 className="text-lg font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
