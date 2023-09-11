import React from "react";

type CustomAlertBoxProps = {
  message: string;
  onClose: () => void;
};

const CustomAlertBox: React.FC<CustomAlertBoxProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black text-white p-4 rounded-lg shadow-md text-center">
        <p className="text-xl mb-4">{message}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomAlertBox;
