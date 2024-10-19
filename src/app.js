import express from 'express'; // Sử dụng cú pháp import
import sequelize from './config/database.js'; // Import kết nối cơ sở dữ liệu
import User from './models/User.js'; // Import model User
import RoomType from './models/RoomType.js'; // Import model RoomType
import Room from './models/Room.js'; // Import model Room
import Booking from './models/Booking.js'; // Import model Booking

const app = express();
const port = 3000;

// Thiết lập đồng bộ hóa cơ sở dữ liệu
sequelize.sync({ force: false }) // force: false -> không xóa dữ liệu cũ
  .then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ.');
  })
  .catch(err => {
    console.error('Không thể kết nối với cơ sở dữ liệu:', err);
  });

// Thiết lập route cơ bản
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Máy chủ lắng nghe tại cổng đã chỉ định
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
