import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Component Hộp thoại xác nhận (Confirm Modal)
 * Dùng thay thế cho window.confirm() mặc định
 * @param {boolean} isOpen - Trạng thái hiển thị modal
 * @param {string} title - Tiêu đề hộp thoại
 * @param {string} message - Nội dung thông báo
 * @param {Function} onConfirm - Hàm chạy khi bấm Đồng ý
 * @param {Function} onCancel - Hàm chạy khi bấm Hủy
 * @param {string} confirmText - Chữ trên nút Đồng ý (mặc định: Xóa)
 */
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Xóa' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {title || 'Xác nhận xóa'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {message || 'Bạn có chắc chắn muốn thực hiện hành động này?'}
            </p>
          </div>

          <div className="w-full flex items-center gap-3 pt-4">
            <button 
              onClick={onCancel}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Hủy bỏ
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-500/30 transition-all"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
