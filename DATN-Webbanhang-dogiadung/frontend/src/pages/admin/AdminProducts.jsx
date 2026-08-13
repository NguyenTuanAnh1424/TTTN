import { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api';

const EMPTY_FORM = {
  id: '', sku: '', name: '', categoryId: '', price: '', originalPrice: '',
  discount: 0, stock: 0, description: '', imageUrl: '', isNew: false, isFeatured: false,
};

export default function AdminProducts() {
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [showModal, setShowModal]   = useState(false);
  const [editMode, setEditMode]     = useState(false);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [saving, setSaving]         = useState(false);
  const [msg, setMsg]               = useState('');

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/products`).then(r => r.json()),
      fetch(`${API}/categories`).then(r => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditMode(false);
    setMsg('');
    setShowModal(true);
  };

  const openEdit = (p) => {
    setForm({
      id: p.id, sku: p.sku, name: p.name, categoryId: p.categoryId,
      price: p.price, originalPrice: p.originalPrice,
      discount: p.discount, stock: p.stock,
      description: p.description || '', imageUrl: p.imageUrl || '',
      isNew: p.isNew || false, isFeatured: p.isFeatured || false,
    });
    setEditMode(true);
    setMsg('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    const payload = {
      ...form,
      price: parseFloat(form.price) || 0,
      originalPrice: parseFloat(form.originalPrice) || 0,
      discount: parseInt(form.discount) || 0,
      stock: parseInt(form.stock) || 0,
    };

    try {
      const url    = editMode ? `${API}/products/${form.id}` : `${API}/products`;
      const method = editMode ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMsg('✅ Lưu thành công!');
        fetchData();
        setTimeout(() => setShowModal(false), 1000);
      } else {
        const err = await res.json().catch(() => ({}));
        setMsg('❌ Lỗi: ' + (err.message || res.status));
      }
    } catch {
      setMsg('❌ Lỗi kết nối server.');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa sản phẩm này?')) return;
    await fetch(`${API}/products/${id}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getCatName = (id) => categories.find(c => c.id === id)?.name || id;

  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit} style={{
            background: '#fff', borderRadius: '12px', padding: '2rem',
            width: '600px', maxHeight: '90vh', overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{editMode ? '✏️ Sửa sản phẩm' : '➕ Thêm sản phẩm mới'}</h2>
              <button type="button" onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormField label="Tên sản phẩm *" span={2}>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </FormField>
              <FormField label="SKU">
                <input value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} placeholder="Tự tạo nếu để trống" />
              </FormField>
              <FormField label="Danh mục *">
                <select required value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </FormField>
              <FormField label="Giá bán (đ) *">
                <input required type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
              </FormField>
              <FormField label="Giá gốc (đ)">
                <input type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} />
              </FormField>
              <FormField label="Giảm giá (%)">
                <input type="number" min="0" max="100" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} />
              </FormField>
              <FormField label="Tồn kho">
                <input type="number" min="0" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
              </FormField>
              <FormField label="URL Hình ảnh" span={2}>
                <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." />
              </FormField>
              <FormField label="Mô tả" span={2}>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
              </FormField>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', fontWeight: 500 }}>
                  <input type="checkbox" checked={form.isNew} onChange={e => setForm(f => ({ ...f, isNew: e.target.checked }))} />
                  🆕 Sản phẩm mới
                </label>
                <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', fontWeight: 500 }}>
                  <input type="checkbox" checked={form.isFeatured} onChange={e => setForm(f => ({ ...f, isFeatured: e.target.checked }))} />
                  ⭐ Nổi bật
                </label>
              </div>
            </div>

            {msg && <p style={{ marginTop: '1rem', fontWeight: 600, color: msg.startsWith('✅') ? '#28a745' : '#e60012' }}>{msg}</p>}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1.5rem', border: '1px solid #ddd', borderRadius: '6px', background: '#f8f9fa', cursor: 'pointer', fontWeight: 600 }}>Hủy</button>
              <button type="submit" disabled={saving} style={{ padding: '0.6rem 1.5rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                {saving ? 'Đang lưu...' : editMode ? 'Cập nhật' : 'Thêm sản phẩm'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ margin: 0 }}>🛍️ Quản lý Sản phẩm</h2>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Tìm tên, SKU..."
              style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem', width: '220px' }}
            />
            <button onClick={openAdd} style={{ padding: '0.5rem 1.2rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
              + Thêm mới
            </button>
            <span style={{ color: '#888', fontSize: '0.9rem' }}>{filtered.length}/{products.length} sản phẩm</span>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>Đang tải...</div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>SKU</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Giá bán</th>
                  <th>Giảm giá</th>
                  <th>Tồn kho</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      {p.imageUrl
                        ? <img src={p.imageUrl} alt={p.name} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }} />
                        : <div style={{ width: 52, height: 52, background: '#f0f0f0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>🖼️</div>
                      }
                    </td>
                    <td style={{ color: '#007bff', fontSize: '0.85rem', fontWeight: 600 }}>{p.sku}</td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                        {p.isNew && <span style={{ background: '#d4edda', color: '#155724', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '8px' }}>Mới</span>}
                        {p.isFeatured && <span style={{ background: '#fff3cd', color: '#856404', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '8px' }}>Nổi bật</span>}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{getCatName(p.categoryId)}</td>
                    <td style={{ fontWeight: 600 }}>{Number(p.price).toLocaleString('vi-VN')}đ</td>
                    <td>
                      {p.discount > 0
                        ? <span style={{ background: '#f8d7da', color: '#721c24', padding: '2px 8px', borderRadius: '10px', fontWeight: 600, fontSize: '0.85rem' }}>-{p.discount}%</span>
                        : <span style={{ color: '#ccc' }}>--</span>
                      }
                    </td>
                    <td>
                      <span style={{ color: p.stock < 5 ? '#e60012' : p.stock < 20 ? '#ffc107' : '#28a745', fontWeight: 600 }}>{p.stock}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => openEdit(p)} className="admin-btn btn-edit" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}>Sửa</button>
                        <button onClick={() => handleDelete(p.id)} className="admin-btn btn-danger" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }}>Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>😕 Không tìm thấy sản phẩm.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function FormField({ label, children, span = 1 }) {
  return (
    <div style={{ gridColumn: `span ${span}` }}>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '4px' }}>{label}</label>
      {children}
      <style>{`
        form input, form select, form textarea {
          width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #ddd;
          border-radius: 6px; font-size: 0.9rem; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        form input:focus, form select:focus, form textarea:focus {
          outline: none; border-color: #007bff;
        }
      `}</style>
    </div>
  );
}
