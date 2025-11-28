import React from "react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, task }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-bold mb-3">Delete Task</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Are you sure you want to delete 
          <span className="font-semibold"> "{task.title}"</span>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(task.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
