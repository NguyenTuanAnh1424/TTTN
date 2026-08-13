import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Users, Shield, Lock, Unlock, Edit, Trash2 } from 'lucide-react';

/**
 * Trang Quản Lý Người Dùng & Phân Quyền Role Dành Cho SuperAdmin / Admin (AdminUserManager)
 */
const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/admin/users?page=${page}&limit=10`);
      if (res.success) {
        setUsers(res.data || []);
        setPagination(res.pagination);
      }
    } catch (err) {
      console.error('Lỗi lấy người dùng:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  // Đổi Vai trò (Role)
  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosClient.put(`/admin/users/${userId}`, { role: newRole });
      alert(`Đã phân quyền cho tài khoản thành: ${newRole}`);
      fetchUsers(pagination.currentPage);
    } catch (err) {
      alert('Lỗi đổi phân quyền: ' + err.message);
    }
  };

  // Khóa / Mở khóa tài khoản
  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await axiosClient.put(`/admin/users/${userId}`, { status: !currentStatus });
      alert(`Đã ${!currentStatus ? 'Mở khóa' : 'Khóa'} tài khoản thành công!`);
      fetchUsers(pagination.currentPage);
    } catch (err) {
      alert('Lỗi đổi trạng thái: ' + err.message);
    }
  };

  // Xóa tài khoản
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Bạn có chắc muốn xóa tài khoản này?')) return;
    try {
      await axiosClient.delete(`/admin/users/${userId}`);
      alert('Đã xóa tài khoản!');
      fetchUsers(pagination.currentPage);
    } catch (err) {
      alert('Lỗi xóa người dùng: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" /> Quản Lý Người Dùng & Phân Quyền Role
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Quản lý SuperAdmin, Admin, Editor và Khách hàng trong hệ thống.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-500">Đang tải người dùng...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="py-3.5 px-4">ID</th>
                  <th className="py-3.5 px-4">Họ tên & Email</th>
                  <th className="py-3.5 px-4">Số điện thoại</th>
                  <th className="py-3.5 px-4">Phân quyền (Role)</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="py-3 px-4 font-bold text-gray-400">#{u.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-gray-900 dark:text-white">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium">{u.phone || 'Chưa cập nhật'}</td>
                    <td className="py-3 px-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        disabled={u.role === 'SuperAdmin'}
                        className="px-2.5 py-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-blue-600 dark:text-blue-400 focus:outline-none"
                      >
                        <option value="SuperAdmin">SuperAdmin</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="User">User (Khách)</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      {u.status ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Hoạt động</span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">Bị khóa</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(u.id, u.status)}
                          disabled={u.role === 'SuperAdmin'}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl disabled:opacity-30"
                          title={u.status ? 'Khóa tài khoản' : 'Mở khóa'}
                        >
                          {u.status ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4 text-emerald-600" />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          disabled={u.role === 'SuperAdmin'}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl disabled:opacity-30"
                          title="Xóa tài khoản"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminUserManager;
