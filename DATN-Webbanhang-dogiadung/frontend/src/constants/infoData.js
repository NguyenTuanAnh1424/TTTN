export const infoContent = {
  'van-chuyen': {
    title: 'Thông tin vận chuyển',
    icon: '🚚',
    body: `
      <h4>Phạm vi giao hàng</h4>
      <p>HomeVibe giao hàng toàn quốc 63 tỉnh thành, kể cả các vùng xa và hải đảo.</p>

      <h4>Thời gian giao hàng dự kiến</h4>
      <table style="width:100%; border-collapse: collapse; margin: 1rem 0;">
        <tr style="background: #f4f4f4; text-align: left;">
          <th style="padding: 10px; border: 1px solid #ddd;">Khu vực</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Giao tiêu chuẩn</th>
          <th style="padding: 10px; border: 1px solid #ddd;">Giao nhanh (Hỏa tốc)</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">Nội thành TP.HCM & Hà Nội</td>
          <td style="padding: 10px; border: 1px solid #ddd;">1–2 ngày làm việc</td>
          <td style="padding: 10px; border: 1px solid #ddd;">2–4 giờ</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">Tỉnh thành lớn khác</td>
          <td style="padding: 10px; border: 1px solid #ddd;">2–4 ngày làm việc</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Không áp dụng</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">Vùng xa, hải đảo</td>
          <td style="padding: 10px; border: 1px solid #ddd;">5–7 ngày làm việc</td>
          <td style="padding: 10px; border: 1px solid #ddd;">Không áp dụng</td>
        </tr>
      </table>

      <h4>Phí vận chuyển</h4>
      <ul>
        <li>Giao hàng tiêu chuẩn: <strong>30.000đ</strong></li>
        <li>Giao nhanh Hỏa tốc: <strong>50.000đ</strong></li>
        <li><strong>Miễn phí vận chuyển</strong> toàn quốc cho đơn hàng từ <strong>500.000đ</strong> trở lên (áp dụng giao tiêu chuẩn).</li>
      </ul>

      <h4>Đơn vị vận chuyển hợp tác</h4>
      <p>HomeVibe hợp tác với GHN, GHTK, Viettel Post và J&T Express để đảm bảo chất lượng giao hàng tối ưu nhất.</p>

      <h4>Lưu ý quan trọng</h4>
      <ul>
        <li>Thời gian giao hàng có thể kéo dài thêm 1–2 ngày vào các dịp lễ, Tết.</li>
        <li>Khách hàng sẽ nhận được SMS/Email thông báo khi đơn hàng được xuất kho.</li>
        <li>Vui lòng kiểm tra hàng trước khi ký nhận và thanh toán cho nhân viên giao hàng.</li>
      </ul>
    `
  },
  'thanh-toan-cod': {
    title: 'Thanh toán khi nhận hàng (COD)',
    icon: '💵',
    body: `
      <h4>Hình thức thanh toán COD là gì?</h4>
      <p>COD (Cash on Delivery) là hình thức thanh toán tiền mặt trực tiếp cho nhân viên giao hàng khi nhận được sản phẩm. Bạn không cần thanh toán trước, chỉ trả tiền khi đã nhận hàng và cảm thấy hài lòng.</p>

      <h4>Quy trình thực hiện COD</h4>
      <ol>
        <li>Đặt hàng trên HomeVibe và chọn phương thức "Thanh toán khi nhận hàng".</li>
        <li>HomeVibe xác nhận đơn hàng qua SMS/Email trong vòng 30 phút.</li>
        <li>Đơn hàng được đóng gói và chuyển cho đơn vị vận chuyển.</li>
        <li>Nhân viên giao hàng sẽ liên hệ trước khi đến giao.</li>
        <li>Kiểm tra hàng hóa → Thanh toán tiền mặt → Ký nhận.</li>
      </ol>

      <h4>Điều kiện áp dụng</h4>
      <ul>
        <li>Áp dụng cho tất cả đơn hàng dưới <strong>10.000.000đ</strong>.</li>
        <li>Đơn hàng trên 10 triệu yêu cầu đặt cọc trước 30% qua chuyển khoản.</li>
        <li>Không áp dụng COD cho đơn hàng giao đến vùng hải đảo.</li>
      </ul>

      <h4>Lưu ý</h4>
      <p>Vui lòng chuẩn bị đúng số tiền khi nhận hàng. Nhân viên giao hàng không đảm bảo có tiền thối.</p>
    `
  },
  'thanh-toan': {
    title: 'Phương thức thanh toán',
    icon: '💳',
    body: `
      <h4>Các phương thức thanh toán được chấp nhận</h4>

      <h5>1. Thanh toán khi nhận hàng (COD)</h5>
      <p>Trả tiền mặt trực tiếp cho shipper khi nhận hàng. Áp dụng cho đơn hàng dưới 10 triệu đồng.</p>

      <h5>2. Chuyển khoản ngân hàng (VietQR)</h5>
      <p>Quét mã VietQR hoặc chuyển khoản trực tiếp đến tài khoản:</p>
      <ul>
        <li>Ngân hàng: <strong>MBBank</strong></li>
        <li>Số tài khoản: <strong>0967258610</strong></li>
        <li>Chủ tài khoản: <strong>NGUYEN TUAN ANH</strong></li>
        <li>Nội dung: <em>[Mã đơn hàng]</em> (hệ thống tự điền)</li>
      </ul>

      <h5>3. Ví điện tử</h5>
      <p>HomeVibe đang tích hợp thêm MoMo, ZaloPay và VNPay — sẽ ra mắt trong thời gian sớm nhất.</p>

      <h4>Bảo mật thanh toán</h4>
      <p>Mọi giao dịch chuyển khoản đều được mã hóa SSL. HomeVibe <strong>KHÔNG bao giờ</strong> yêu cầu bạn cung cấp mật khẩu ngân hàng.</p>
    `
  },
  'kiem-tra': {
    title: 'Chính sách kiểm tra hàng hóa',
    icon: '🔍',
    body: `
      <h4>Quyền kiểm tra hàng trước khi nhận</h4>
      <p>HomeVibe cho phép và khuyến khích khách hàng <strong>mở hộp kiểm tra hàng hóa</strong> trước khi ký nhận và thanh toán (với đơn COD). Đây là quyền lợi chính đáng của bạn.</p>

      <h4>Những gì bạn nên kiểm tra</h4>
      <ul>
        <li>✅ Bao bì ngoài có bị rách, móp méo, ướt không?</li>
        <li>✅ Sản phẩm có đúng với mô tả trên website (màu sắc, kích thước, chủng loại)?</li>
        <li>✅ Sản phẩm có bị trầy xước, gãy vỡ, thiếu phụ kiện không?</li>
        <li>✅ Tem nhãn, hóa đơn có nguyên vẹn không?</li>
      </ul>

      <h4>Trường hợp từ chối nhận hàng</h4>
      <p>Bạn có quyền <strong>từ chối nhận</strong> và yêu cầu hoàn trả nếu:</p>
      <ul>
        <li>Sản phẩm bị hư hỏng rõ ràng do quá trình vận chuyển.</li>
        <li>Sản phẩm không đúng mẫu mã, màu sắc so với đơn hàng.</li>
        <li>Thiếu phụ kiện, bộ phận so với mô tả sản phẩm.</li>
      </ul>
      <p>Hãy chụp ảnh bằng chứng và liên hệ HomeVibe ngay qua hotline hoặc email để được hỗ trợ.</p>
    `
  },
  'doi-tra': {
    title: 'Chính sách đổi trả hàng',
    icon: '🔄',
    body: `
      <h4>Thời hạn đổi trả</h4>
      <ul>
        <li><strong>7 ngày</strong> đổi trả với sản phẩm lỗi từ nhà sản xuất (kể từ ngày nhận hàng).</li>
        <li><strong>30 ngày</strong> bảo hành hàng hóa đối với các sản phẩm điện tử nhà bếp.</li>
        <li>Không áp dụng đổi trả với lý do "không thích" sau khi đã sử dụng.</li>
      </ul>

      <h4>Điều kiện đổi trả hợp lệ</h4>
      <ul>
        <li>Sản phẩm còn nguyên vẹn, chưa qua sử dụng (trừ trường hợp phát hiện lỗi khi dùng).</li>
        <li>Còn đầy đủ hóa đơn mua hàng từ HomeVibe.</li>
        <li>Bao bì, nhãn mác còn nguyên.</li>
        <li>Thông báo đổi trả trong vòng <strong>48 giờ</strong> sau khi nhận hàng (với lỗi vận chuyển).</li>
      </ul>

      <h4>Trường hợp KHÔNG được đổi trả</h4>
      <ul>
        <li>Sản phẩm đã qua sử dụng, có dấu vết cọ xát.</li>
        <li>Thiếu hóa đơn hoặc phụ kiện đi kèm.</li>
        <li>Hàng thuộc danh mục hàng hóa thanh lý (clearance).</li>
        <li>Lỗi do người dùng (va đập, tự sửa chữa, dùng sai cách).</li>
      </ul>

      <h4>Quy trình đổi trả</h4>
      <ol>
        <li>Liên hệ HomeVibe qua email: <strong>support@homevibe.vn</strong> hoặc hotline.</li>
        <li>Cung cấp mã đơn hàng và mô tả lỗi kèm ảnh/video bằng chứng.</li>
        <li>HomeVibe xét duyệt trong vòng 1–2 ngày làm việc.</li>
        <li>Gửi hàng lỗi về kho (HomeVibe hỗ trợ phí ship chiều về).</li>
        <li>Nhận hàng đổi mới hoặc hoàn tiền trong vòng 5–7 ngày.</li>
      </ol>
    `
  },
  'dieu-khoan': {
    title: 'Điều khoản sử dụng',
    icon: '📋',
    body: `
      <h4>1. Chấp thuận điều khoản</h4>
      <p>Khi truy cập và sử dụng website HomeVibe, bạn đồng ý tuân thủ các điều khoản sử dụng này. Nếu không đồng ý, vui lòng ngừng sử dụng dịch vụ.</p>

      <h4>2. Quyền sở hữu trí tuệ</h4>
      <p>Toàn bộ nội dung trên HomeVibe (hình ảnh, logo, văn bản, thiết kế...) đều thuộc quyền sở hữu của Công ty TNHH Thương Mại HomeVibe Việt Nam. Nghiêm cấm sao chép, phân phối mà không có sự đồng ý bằng văn bản.</p>

      <h4>3. Tài khoản người dùng</h4>
      <ul>
        <li>Bạn chịu trách nhiệm bảo mật tài khoản và mật khẩu của mình.</li>
        <li>HomeVibe có quyền khóa tài khoản nếu phát hiện hành vi gian lận, vi phạm pháp luật.</li>
        <li>Không được sử dụng tài khoản của người khác mà không có sự đồng ý.</li>
      </ul>

      <h4>4. Giới hạn trách nhiệm</h4>
      <p>HomeVibe không chịu trách nhiệm về các thiệt hại phát sinh do lỗi kỹ thuật, sự cố mạng, hoặc hành vi của bên thứ ba. Chúng tôi cam kết xử lý sự cố trong thời gian sớm nhất có thể.</p>

      <h4>5. Thay đổi điều khoản</h4>
      <p>HomeVibe có quyền cập nhật điều khoản bất kỳ lúc nào. Thay đổi sẽ có hiệu lực ngay khi đăng tải. Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn chấp nhận các thay đổi đó.</p>
    `
  },
  'bao-mat': {
    title: 'Chính sách bảo mật',
    icon: '🔒',
    body: `
      <h4>Thông tin chúng tôi thu thập</h4>
      <ul>
        <li>Họ tên, email, số điện thoại khi đăng ký tài khoản hoặc đặt hàng.</li>
        <li>Địa chỉ giao hàng.</li>
        <li>Lịch sử mua hàng và tương tác trên website.</li>
        <li>Thông tin thiết bị, trình duyệt và địa chỉ IP (ẩn danh).</li>
      </ul>

      <h4>Mục đích sử dụng thông tin</h4>
      <ul>
        <li>Xử lý đơn hàng và giao hàng chính xác.</li>
        <li>Gửi thông báo đơn hàng, khuyến mãi (nếu bạn đồng ý nhận).</li>
        <li>Cải thiện trải nghiệm người dùng trên website.</li>
        <li>Ngăn chặn gian lận và bảo vệ tài khoản của bạn.</li>
      </ul>

      <h4>Cam kết bảo mật</h4>
      <ul>
        <li>HomeVibe <strong>KHÔNG bao giờ</strong> bán hoặc cho thuê thông tin cá nhân của bạn.</li>
        <li>Mọi dữ liệu được mã hóa SSL 256-bit trong quá trình truyền tải.</li>
        <li>Chỉ nhân viên được ủy quyền mới có thể truy cập dữ liệu khách hàng.</li>
      </ul>

      <h4>Quyền của bạn</h4>
      <ul>
        <li>Yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân.</li>
        <li>Hủy đăng ký nhận email marketing bất kỳ lúc nào.</li>
        <li>Khiếu nại về việc sử dụng dữ liệu sai mục đích.</li>
      </ul>
      <p>Email liên hệ: <strong>privacy@homevibe.vn</strong></p>
    `
  },
  've-chung-toi': {
    title: 'Về chúng tôi — HomeVibe',
    icon: '🏠',
    body: `
      <h4>Câu chuyện HomeVibe</h4>
      <p>HomeVibe ra đời năm 2015 với sứ mệnh mang đến những sản phẩm nội thất và gia dụng chất lượng cao với mức giá hợp lý cho mọi gia đình Việt Nam. Từ một cửa hàng nhỏ tại TP. Hồ Chí Minh, chúng tôi đã phát triển thành nền tảng thương mại điện tử nội thất hàng đầu trong nước.</p>

      <h4>Tầm nhìn & Sứ mệnh</h4>
      <ul>
        <li><strong>Tầm nhìn:</strong> Trở thành điểm đến số 1 cho mọi giải pháp không gian sống tại Đông Nam Á.</li>
        <li><strong>Sứ mệnh:</strong> Giúp mọi gia đình tạo ra không gian sống đẹp, tiện nghi và cá nhân hóa với ngân sách phù hợp.</li>
      </ul>

      <h4>Giá trị cốt lõi</h4>
      <ul>
        <li>🌿 <strong>Bền vững:</strong> Ưu tiên vật liệu thân thiện với môi trường.</li>
        <li>💡 <strong>Sáng tạo:</strong> Liên tục cập nhật xu hướng thiết kế nội thất toàn cầu.</li>
        <li>❤️ <strong>Tận tâm:</strong> Đặt sự hài lòng của khách hàng lên hàng đầu.</li>
        <li>🤝 <strong>Trung thực:</strong> Minh bạch về chất lượng, giá cả và chính sách.</li>
      </ul>

      <h4>Con số ấn tượng</h4>
      <ul>
        <li>📦 Hơn <strong>5.000 sản phẩm</strong> đa dạng từ 200+ thương hiệu uy tín.</li>
        <li>👥 Phục vụ hơn <strong>500.000 khách hàng</strong> trên toàn quốc.</li>
        <li>⭐ Điểm đánh giá trung bình <strong>4.8/5</strong> từ hàng nghìn đánh giá thực.</li>
        <li>🚀 Tăng trưởng <strong>120%</strong> mỗi năm liên tục từ 2020.</li>
      </ul>

      <h4>Thông tin doanh nghiệp</h4>
      <p>
        Tên: <strong>CÔNG TY TNHH THƯƠNG MẠI HOMEVIBE VIỆT NAM</strong><br/>
        MST: <strong>0313596856</strong><br/>
        Địa chỉ: 473 Điện Biên Phủ, Phường Thạnh Mỹ Tây, TP. Hồ Chí Minh<br/>
        Email: <strong>info@homevibe.vn</strong> | Hotline: <strong>1800 6789</strong>
      </p>
    `
  },
  'lien-he': {
    title: 'Liên hệ với chúng tôi',
    icon: '📞',
    body: `
      <h4>Hotline hỗ trợ khách hàng</h4>
      <p style="font-size:1.5rem; font-weight:700; color:#009e82;">📞 1800 6789</p>
      <p><em>Miễn phí cước gọi • Hoạt động: 8:00 – 22:00 tất cả các ngày trong tuần (kể cả Chủ nhật và ngày lễ)</em></p>

      <h4>Email hỗ trợ</h4>
      <ul>
        <li>Hỗ trợ đơn hàng: <strong>support@homevibe.vn</strong></li>
        <li>Hợp tác kinh doanh: <strong>partner@homevibe.vn</strong></li>
        <li>Bảo mật & quyền riêng tư: <strong>privacy@homevibe.vn</strong></li>
      </ul>

      <h4>Chat trực tuyến</h4>
      <p>Bạn có thể chat trực tiếp với đội ngũ tư vấn của HomeVibe qua nút chat góc dưới bên phải màn hình (8:00 – 22:00).</p>

      <h4>Trụ sở chính</h4>
      <p>
        Cao ốc văn phòng Golden Building,<br/>
        473 Điện Biên Phủ, Phường Thạnh Mỹ Tây,<br/>
        Thành phố Hồ Chí Minh, Việt Nam<br/>
        <em>(Không tiếp nhận hàng đổi trả tại trụ sở)</em>
      </p>

      <h4>Thời gian làm việc văn phòng</h4>
      <p>Thứ Hai – Thứ Sáu: <strong>8:00 – 17:30</strong><br/>
      Thứ Bảy: <strong>8:00 – 12:00</strong><br/>
      Chủ nhật & Ngày lễ: Nghỉ (hotline vẫn hoạt động)</p>
    `
  },
};
