import { useState } from 'react';

const API = 'http://localhost:5000/api';

export default function AdminSettings() {
  const [section, setSection] = useState('general');
  const [initMsg, setInitMsg] = useState('');
  const [initLoading, setInitLoading] = useState(false);

  const tabs = [
    { id: 'general', label: '🏪 Thông tin website' },
    { id: 'database', label: '🗄️ Cơ sở dữ liệu' },
    { id: 'api',      label: '🔌 API & Kết nối' },
  ];

  const handleInitDB = async () => {
    setInitLoading(true);
    setInitMsg('');
    try {
      const res = await fetch(`${API}/orders/init`);
      const text = await res.text();
      setInitMsg(res.ok ? '✅ ' + text : '❌ Lỗi: ' + text);
    } catch {
      setInitMsg('❌ Không kết nối được server.');
    }
    setInitLoading(false);
  };

  const testApi = async (url) => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return `✅ OK (${Array.isArray(data) ? data.length + ' items' : 'connected'})`;
      }
      return `❌ HTTP ${res.status}`;
    } catch {
      return '❌ Không kết nối được';
    }
  };

  const [testResults, setTestResults] = useState({});

  const runTest = async (key, url) => {
    setTestResults(prev => ({ ...prev, [key]: '⏳ Đang kiểm tra...' }));
    const result = await testApi(url);
    setTestResults(prev => ({ ...prev, [key]: result }));
  };

  return (
    <div>
      <div className="admin-card">
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', borderBottom: '2px solid #f0f0f0' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setSection(t.id)}
              style={{
                padding: '0.75rem 1.5rem', border: 'none', background: 'none',
                cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                color: section === t.id ? '#007bff' : '#888',
                borderBottom: section === t.id ? '2px solid #007bff' : '2px solid transparent',
                marginBottom: '-2px', transition: 'all 0.2s'
              }}
            >{t.label}</button>
          ))}
        </div>

        {section === 'general' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>🏪 Thông tin cửa hàng</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: '700px' }}>
              {[
                ['Tên website', 'HOMEVIBE'],
                ['Slogan', 'Nâng tầm không gian sống của bạn'],
                ['Hotline', '1800 1234'],
                ['Email hỗ trợ', 'support@homevibe.vn'],
                ['Địa chỉ', '123 Đường ABC, Quận XYZ, TP.HCM'],
                ['Facebook', 'fb.com/homevibe'],
              ].map(([label, value]) => (
                <div key={label}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '4px' }}>{label}</label>
                  <input
                    defaultValue={value}
                    style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <button style={{ padding: '0.6rem 2rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
                💾 Lưu thay đổi
              </button>
              <small style={{ marginLeft: '1rem', color: '#888' }}>Chức năng lưu cấu hình sẽ được tích hợp với backend.</small>
            </div>
          </div>
        )}

        {section === 'database' && (
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>🗄️ Quản lý cơ sở dữ liệu</h2>
            <p style={{ color: '#888', marginBottom: '2rem' }}>Khởi tạo và kiểm tra cấu trúc bảng trong SQL Server.</p>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.75rem' }}>Khởi tạo bảng DB</h3>
              <p style={{ color: '#666', margin: '0 0 1rem', fontSize: '0.9rem' }}>
                Tạo các bảng <code style={{ background: '#eee', padding: '1px 6px', borderRadius: '4px' }}>Orders</code> và{' '}
                <code style={{ background: '#eee', padding: '1px 6px', borderRadius: '4px' }}>ProductImages</code> nếu chưa tồn tại.
              </p>
              <button
                onClick={handleInitDB}
                disabled={initLoading}
                style={{ padding: '0.6rem 1.5rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
              >
                {initLoading ? '⏳ Đang xử lý...' : '🚀 Khởi tạo DB'}
              </button>
              {initMsg && (
                <div style={{
                  marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '8px',
                  background: initMsg.startsWith('✅') ? '#d4edda' : '#f8d7da',
                  color: initMsg.startsWith('✅') ? '#155724' : '#721c24',
                  fontWeight: 600
                }}>{initMsg}</div>
              )}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem' }}>Thông tin kết nối</h3>
              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#333' }}>
                <div style={{ marginBottom: '0.5rem' }}>📡 <strong>Server:</strong> localhost (SQL Server)</div>
                <div style={{ marginBottom: '0.5rem' }}>🗃️ <strong>Database:</strong> HomeVibeDB</div>
                <div style={{ marginBottom: '0.5rem' }}>🔗 <strong>API URL:</strong> http://localhost:5000/api</div>
              </div>
            </div>
          </div>
        )}

        {section === 'api' && (
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>🔌 Kiểm tra API & Kết nối</h2>
            <p style={{ color: '#888', marginBottom: '2rem' }}>Xác nhận các endpoint API hoạt động bình thường.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { key: 'products', label: 'API Sản phẩm', url: `${API}/products` },
                { key: 'categories', label: 'API Danh mục', url: `${API}/categories` },
                { key: 'orders', label: 'API Đơn hàng', url: `${API}/orders` },
                { key: 'stats', label: 'API Thống kê Admin', url: `${API}/admin/stats` },
              ].map(item => (
                <div key={item.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888', fontFamily: 'monospace', marginTop: '2px' }}>{item.url}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {testResults[item.key] && (
                      <span style={{
                        fontWeight: 600, fontSize: '0.85rem',
                        color: testResults[item.key].startsWith('✅') ? '#28a745' : '#e60012'
                      }}>{testResults[item.key]}</span>
                    )}
                    <button
                      onClick={() => runTest(item.key, item.url)}
                      style={{ padding: '0.4rem 1rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                    >
                      Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
