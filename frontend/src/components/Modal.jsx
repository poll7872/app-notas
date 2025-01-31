import { DismissCircleFilled } from "@fluentui/react-icons";

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative mx-4">
        <button className="absolute -top-0 right-1" onClick={onClose}>
          <DismissCircleFilled className="text-red-500 text-xl hover:text-red-400" />
        </button>
        {children}
      </div>
    </div>
  );
}
