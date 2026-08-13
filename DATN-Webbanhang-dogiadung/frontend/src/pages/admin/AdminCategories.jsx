import { useState, useEffect } from 'react';

const API = 'http://localhost:5051/api';

const EMPTY_FORM = { id: '', name: '', nameEn: '', emoji: '📦', gradient: '', targetCount: '' };

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editMode, setEditMode]     = useState(false);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [saving, setSaving]         = useState(false);
  const [msg, setMsg]               = useState('');

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/categories`).then(r => r.json()),
      fetch(`${API}/products`).then(r => r.json()),
    ]).then(([cats, prods]) => {
      setCategories(cats);
      setProducts(prods);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const countByCategory = (catId) => products.filter(p => p.categoryId === catId).length;

  const openAdd  = () => { setForm(EMPTY_FORM); setEditMode(false); setMsg(''); setShowModal(true); };
  const openEdit = (c) => {
    setForm({ id: c.id, name: c.name, nameEn: c.nameEn || '', emoji: c.emoji || '📦', gradient: c.gradient || '', targetCount: c.targetCount || '' });
    setEditMode(true); setMsg(''); setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setMsg('');
    const payload = { ...form, targetCount: parseInt(form.targetCount) || null };
    try {
      // Categories API - dùng PUT để cập nhật, POST để tạo mới (mở rộng backend nếu cần)
      const url    = editMode ? `${API}/categories/${form.id}` : `${API}/categories`;
      const method = editMode ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) { setMsg('✅ Lưu thành công!'); fetchData(); setTimeout(() => setShowModal(false), 1000); }
      else { const err = await res.json().catch(() => ({})); setMsg('❌ ' + (err.message || `HTTP ${res.status}`)); }
    } catch { setMsg('❌ Lỗi kết nối server.'); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const count = countByCategory(id);
    if (count > 0 && !window.confirm(`Danh mục này có ${count} sản phẩm. Bạn có chắc muốn xóa?`)) return;
    else if (count === 0 && !window.confirm('Xóa danh mục này?')) return;

    const res = await fetch(`${API}/categories/${id}`, { method: 'DELETE' });
    if (res.ok) setCategories(prev => prev.filter(c => c.id !== id));
    else alert('Không thể xóa danh mục (có thể đang có sản phẩm liên kết).');
  };

  return (
    <div>
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '12px', padding: '2rem', width: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{editMode ? '✏️ Sửa danh mục' : '➕ Thêm danh mục'}</h2>
              <button type="button" onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {!editMode && (
                <div>
                  <label style={labelStyle}>ID danh mục *</label>
                  <input required value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))}
                    placeholder="vd: kitchen, living..." style={inputStyle} />
                  <small style={{ color: '#888' }}>Viết thường, không dấu, không khoảng trắng</small>
                </div>
              )}
              <div>
                <label style={labelStyle}>Tên tiếng Việt *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Tên tiếng Anh</label>
                <input value={form.nameEn} onChange={e => setForm(f => ({ ...f, nameEn: e.target.value }))} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Emoji</label>
                  <input value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Mục tiêu sản phẩm</label>
                  <input type="number" value={form.targetCount} onChange={e => setForm(f => ({ ...f, targetCount: e.target.value }))} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Gradient CSS (tùy chọn)</label>
                <input value={form.gradient} onChange={e => setForm(f => ({ ...f, gradient: e.target.value }))}
                  placeholder="vd: linear-gradient(135deg, #667eea, #764ba2)" style={inputStyle} />
              </div>
              {form.gradient && (
                <div style={{ height: '40px', borderRadius: '8px', background: form.gradient, border: '1px solid #ddd' }} />
              )}
            </div>
            {msg && <p style={{ marginTop: '1rem', fontWeight: 600, color: msg.startsWith('✅') ? '#28a745' : '#e60012' }}>{msg}</p>}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1.5rem', border: '1px solid #ddd', borderRadius: '6px', background: '#f8f9fa', cursor: 'pointer', fontWeight: 600 }}>Hủy</button>
              <button type="submit" disabled={saving} style={{ padding: '0.6rem 1.5rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                {saving ? 'Đang lưu...' : editMode ? 'Cập nhật' : 'Thêm danh mục'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>📂 Quản lý Danh mục</h2>
          <button onClick={openAdd} style={{ padding: '0.5rem 1.2rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            + Thêm danh mục
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Đang tải...</div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Emoji</th>
                  <th>ID</th>
                  <th>Tên (VI)</th>
                  <th>Tên (EN)</th>
                  <th>Số SP</th>
                  <th>Gradient</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontSize: '1.5rem', textAlign: 'center' }}>{c.emoji}</td>
                    <td style={{ color: '#007bff', fontSize: '0.85rem', fontFamily: 'monospace' }}>{c.id}</td>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td style={{ color: '#888', fontSize: '0.9rem' }}>{c.nameEn || '--'}</td>
                    <td>
                      <span style={{
                        background: countByCategory(c.id) > 0 ? '#d4edda' : '#f8d7da',
                        color: countByCategory(c.id) > 0 ? '#155724' : '#721c24',
                        padding: '2px 10px', borderRadius: '10px', fontWeight: 600, fontSize: '0.85rem'
                      }}>
                        {countByCategory(c.id)} SP
                      </span>
                    </td>
                    <td>
                      {c.gradient
                        ? <div style={{ width: 60, height: 20, borderRadius: 4, background: c.gradient, border: '1px solid #eee', display: 'inline-block' }} title={c.gradient} />
                        : <span style={{ color: '#ccc' }}>--</span>
                      }
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => openEdit(c)} className="admin-btn btn-edit" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}>Sửa</button>
                        <button onClick={() => handleDelete(c.id)} className="admin-btn btn-danger" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}>Xóa</button>
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
}

const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '4px' };
const inputStyle = { width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' };
