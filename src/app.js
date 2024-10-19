import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import User from './models/User.js';
import RoomType from './models/RoomType.js';
import Room from './models/Room.js';
import Booking from './models/Booking.js';
import router from './routes/index.js';

const app = express();
const port = 3000;

// Xử lý __dirname trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Thiết lập view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware để phục vụ các tệp tĩnh (CSS, JS, hình ảnh, ...)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để phân tích dữ liệu từ các form (nếu cần)
app.use(express.urlencoded({ extended: true }));

// Thiết lập đồng bộ hóa cơ sở dữ liệu
sequelize.sync({ force: false }) // force: false -> không xóa dữ liệu cũ
  .then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ.');
  })
  .catch(err => {
    console.error('Không thể kết nối với cơ sở dữ liệu:', err);
  });

app.use('/', router);

// Máy chủ lắng nghe tại cổng đã chỉ định
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
