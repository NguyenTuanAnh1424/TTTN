const fs = require('fs');
const path = require('path');

/**
 * Script tự động chuyển đổi file SQL Server (.sql) sang chuẩn MySQL UTF-8
 * Tự động thêm dấu phẩy câu `;` cuối mỗi lệnh INSERT và dọn sạch lệnh rác T-SQL
 */
const convertSqlServerToMySql = (inputFilePath, outputFilePath) => {
  try {
    if (!fs.existsSync(inputFilePath)) {
      console.error(`❌ Không tìm thấy file nguồn tại: ${inputFilePath}`);
      return false;
    }

    console.log(`🔄 Đang xử lý file: ${inputFilePath} ...`);

    const buffer = fs.readFileSync(inputFilePath);
    let content = '';

    if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
      content = buffer.toString('utf16le');
    } else if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
      content = buffer.toString('utf8');
    } else {
      content = buffer.toString('utf8');
    }

    // 1. Dọn dẹp sạch sẽ các dòng lệnh đặc thù SQL Server
    content = content.replace(/USE\s+\[.*?\];?/gi, '');
    content = content.replace(/^GO\s*$/gim, '');
    content = content.replace(/.*SET\s+IDENTITY_INSERT.*/gi, '');
    content = content.replace(/.*Orders\s+OFF.*/gi, '');
    content = content.replace(/.*OrderItems\s+OFF.*/gi, '');
    content = content.replace(/.*Orders\s+ON.*/gi, '');
    content = content.replace(/.*OrderItems\s+ON.*/gi, '');
    content = content.replace(/.*SET\s+ANSI_NULLS.*/gi, '');
    content = content.replace(/.*SET\s+QUOTED_IDENTIFIER.*/gi, '');
    content = content.replace(/\[dbo\]\./gi, '');

    // 2. Chuyển hàm CAST(...) của SQL Server
    content = content.replace(/CAST\(\s*N?'((?:''|[^'])*)'\s+AS\s+DateTime\)/gi, "'$1'");
    content = content.replace(/CAST\(\s*([0-9.]+)\s+AS\s+Decimal\([^)]*\)\)/gi, "$1");
    content = content.replace(/CAST\(\s*N?'((?:''|[^'])*)'\s+AS\s+Varchar\([^)]*\)\)/gi, "'$1'");

    // 3. Chuyển tiền tố N'string' -> 'string'
    content = content.replace(/N'((?:''|[^'])*)'/g, "'$1'");

    // 4. Xóa ngoặc vuông [ ]
    content = content.replace(/\[([a-zA-Z0-9_]+)\]/g, '$1');

    // 5. Chuyển INSERT Orders / OrderItems -> INSERT INTO `orders` / `order_items`
    content = content.replace(/INSERT\s+(?:INTO\s+)?\`?([a-zA-Z0-9_]+)\`?\s*\((.*?)\)/gi, (match, tableName, cols) => {
      let mappedTable = tableName.toLowerCase();
      if (mappedTable === 'orderitems') mappedTable = 'order_items';

      let cleanCols = cols.replace(/`/g, ''); // Xóa backticks cũ

      let mappedCols = cleanCols
        .replace(/\bId\b/gi, '`id`')
        .replace(/\bOrderCode\b/gi, '`order_code`')
        .replace(/\bUserId\b/gi, '`user_id`')
        .replace(/\bTotalAmount\b/gi, '`total_amount`')
        .replace(/\bStatus\b/gi, '`status`')
        .replace(/\bCreatedAt\b/gi, '`created_at`')
        .replace(/\bNote\b/gi, '`note`')
        .replace(/\bPaymentMethod\b/gi, '`payment_method`')
        .replace(/\bShippingMethod\b/gi, '`shipping_method`')
        .replace(/\bCustomerName\b/gi, '`customer_name`')
        .replace(/\bPhone\b/gi, '`customer_phone`')
        .replace(/\bAddress\b/gi, '`shipping_address`')
        .replace(/\bOrderId\b/gi, '`order_id`')
        .replace(/\bProductId\b/gi, '`product_id`')
        .replace(/\bQuantity\b/gi, '`quantity`')
        .replace(/\bPrice\b/gi, '`price`')
        .replace(/\bName\b/gi, '`name`')
        .replace(/\bCategoryId\b/gi, '`category_id`')
        .replace(/\bOriginalPrice\b/gi, '`sale_price`')
        .replace(/\bStock\b/gi, '`quantity`')
        .replace(/\bImageUrl\b/gi, '`image`')
        .replace(/\bDescription\b/gi, '`description`');

      return `INSERT INTO \`${mappedTable}\` (${mappedCols})`;
    });

    // 6. ĐẢM BẢO CÓ DẤU CHẤM PHẨY `;` Ở CUỐI MỖI CÂU LỆNH INSERT
    let lines = content.split('\n');
    let cleanLines = [];

    for (let line of lines) {
      let trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith('INSERT INTO')) {
        if (!trimmed.endsWith(';')) {
          trimmed += ';';
        }
        cleanLines.push(trimmed);
      }
    }

    fs.writeFileSync(outputFilePath, cleanLines.join('\n'), 'utf8');
    console.log(`✅ Chuyển đổi thành công! File chuẩn MySQL đã lưu tại: ${outputFilePath}`);
    return true;
  } catch (error) {
    console.error('❌ Lỗi khi chuyển đổi SQL:', error);
    return false;
  }
};

const inputPath = fs.existsSync(path.join(__dirname, '../dulieucu.sql')) 
  ? path.join(__dirname, '../dulieucu.sql')
  : path.join(__dirname, '../dulieu_mysql.sql');

const outputPath = path.join(__dirname, '../dulieu_mysql.sql');

convertSqlServerToMySql(inputPath, outputPath);

module.exports = convertSqlServerToMySql;
