import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './AdminVouchers.css';

const API = 'http://localhost:5051/api/vouchers';

const EMPTY_VOUCHER = {
  code: '', discountType: 'Percentage', discountValue: 0, 
  minOrderAmount: 0, maxUsages: 0, startDate: new Date().toISOString().split('T')[0], 
  endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0], isActive: true
};

export default function AdminVouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(EMPTY_VOUCHER);
  const [saving, setSaving] = useState(false);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      // Auto-init if needed
      await fetch(`${API}/init`).catch(() => {});
      
      const res = await fetch(API);
      if (res.ok) {
        const data = await res.json();
        setVouchers(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVouchers(); }, []);

  const openAdd = () => {
    setForm(EMPTY_VOUCHER);
    setEditMode(false);
    setShowModal(true);
  };

  const openEdit = (v) => {
    setForm({
      ...v,
      startDate: v.startDate.split('T')[0],
      endDate: v.endDate.split('T')[0]
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Xóa voucher này?');
    if (!ok) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('✅ Đã xóa voucher');
        fetchVouchers();
      }
    } catch (err) {
      toast.error('❌ Lỗi khi xóa');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...form,
      discountValue: Number(form.discountValue),
      minOrderAmount: Number(form.minOrderAmount),
      maxUsages: Number(form.maxUsages)
    };

    try {
      const url = editMode ? `${API}/${form.id}` : API;
      const method = editMode ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        toast.success(editMode ? '✅ Đã cập nhật' : '✅ Đã tạo thành công');
        setShowModal(false);
        fetchVouchers();
      } else {
        let errorMsg = '';
        try {
           const errData = await res.json();
           errorMsg = errData.message || JSON.stringify(errData);
        } catch {
           errorMsg = await res.text();
        }
        toast.error('❌ Lỗi: ' + errorMsg);
      }
    } catch (err) {
      toast.error('❌ Lỗi kết nối máy chủ');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="vouchers-main">
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
           <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>Quản Lý Voucher</h2>
           <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.4rem' }}>Tạo và quản lý các chương trình khuyến mãi cho cửa hàng</p>
        </div>
        <button className="v-btn-submit" onClick={openAdd} style={{ padding: '0.75rem 1.75rem', borderRadius: '12px' }}>
          + Tạo Voucher Mới
        </button>
      </div>

      <div className="vouchers-container">
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
             <p style={{ color: '#64748b' }}>Đang tải danh sách voucher...</p>
          </div>
        ) : vouchers.length === 0 ? (
          <div style={{ padding: '6rem', textAlign: 'center', background: '#fff', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
             <p style={{ fontSize: '3.5rem' }}>🎟️</p>
             <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 500 }}>Chưa có voucher nào được tạo.</p>
             <button onClick={openAdd} style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: '#0d9488', fontWeight: 700, cursor: 'pointer' }}>Bấm vào đây để tạo voucher đầu tiên</button>
          </div>
        ) : (
          <div className="vouchers-grid">
            {vouchers.map(v => (
              <div key={v.id} className="voucher-card">
                <div className="vc-head">
                  <div className="vc-code">{v.code}</div>
                  <div className={`vc-status ${v.isActive ? 'active' : 'inactive'}`}>
                    {v.isActive ? 'Hoạt động' : 'Tạm ngưng'}
                  </div>
                </div>
                
                <div className="vc-info-list">
                  <div className="vc-info-row">
                    <span className="v-label">Ưu đãi:</span>
                    <span className="v-value highlight">
                      {v.discountType === 'Percentage' ? `Giảm ${v.discountValue}%` : `Giảm ${Number(v.discountValue).toLocaleString()}đ`}
                    </span>
                  </div>
                  <div className="vc-info-row">
                    <span className="v-label">Đơn tối thiểu:</span>
                    <span className="v-value">{Number(v.minOrderAmount).toLocaleString()}đ</span>
                  </div>
                  <div className="vc-info-row">
                    <span className="v-label">Đã dùng:</span>
                    <span className="v-value">{v.currentUsages} / {v.maxUsages === 0 ? '∞' : v.maxUsages}</span>
                  </div>
                  <div className="vc-info-row">
                    <span className="v-label">Hết hạn:</span>
                    <span className="v-value" style={{fontSize: '0.85rem'}}>{new Date(v.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="vc-actions">
                  <button onClick={() => openEdit(v)} className="btn-v-edit">
                    ✏️ Sửa
                  </button>
                  <button onClick={() => handleDelete(v.id)} className="btn-v-delete">
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="v-modal-overlay">
          <form className="v-modal-content" onSubmit={handleSubmit}>
            <h3>{editMode ? 'Cập Nhật Voucher' : 'Tạo Voucher Mới'}</h3>
            
            <div className="v-form-grid">
              <div className="v-input-group">
                <span className="v-label-text">Mã Voucher (viết liền, không dấu)</span>
                <input 
                   required className="v-input"
                   value={form.code} 
                   onChange={e => setForm({...form, code: e.target.value.toUpperCase().replace(/\s/g, '')})} 
                   placeholder="VD: KHUYENMAI20" 
                />
              </div>
              
              <div className="v-input-row">
                <div className="v-input-group">
                  <span className="v-label-text">Loại Giảm Giá</span>
                  <select className="v-select" value={form.discountType} onChange={e => setForm({...form, discountType: e.target.value})}>
                    <option value="Percentage">Phần trăm (%)</option>
                    <option value="FixedAmount">Số tiền (đ)</option>
                  </select>
                </div>
                <div className="v-input-group">
                  <span className="v-label-text">Giá Trị</span>
                  <input className="v-input" type="number" required value={form.discountValue} onChange={e => setForm({...form, discountValue: e.target.value })} />
                </div>
              </div>

              <div className="v-input-row">
                <div className="v-input-group">
                  <span className="v-label-text">Đơn Tối Thiểu (đ)</span>
                  <input className="v-input" type="number" value={form.minOrderAmount} onChange={e => setForm({...form, minOrderAmount: e.target.value })} />
                </div>
                <div className="v-input-group">
                  <span className="v-label-text">Lượt Dùng Tối Đa</span>
                  <input className="v-input" type="number" value={form.maxUsages} onChange={e => setForm({...form, maxUsages: e.target.value })} />
                </div>
              </div>

              <div className="v-input-row">
                <div className="v-input-group">
                  <span className="v-label-text">Ngày Bắt Đầu</span>
                  <input className="v-input" type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value })} />
                </div>
                <div className="v-input-group">
                  <span className="v-label-text">Ngày Kết Thúc</span>
                  <input className="v-input" type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value })} />
                </div>
              </div>

              <label className="v-checkbox-label">
                 <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} />
                 Kích hoạt Voucher này ngay lập tức
              </label>
            </div>

            <div className="v-modal-footer">
              <button type="button" className="v-btn-cancel" onClick={() => setShowModal(false)}>Đóng</button>
              <button type="submit" disabled={saving} className="v-btn-submit">
                {saving ? 'Đang lưu...' : editMode ? 'Cập Nhật Ngay' : 'Tạo Voucher'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
