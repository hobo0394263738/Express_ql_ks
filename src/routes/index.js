import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

// Route cho trang chủ
router.get('/', (req, res) => {
  res.render('layouts/public-layout', {
    title: 'Trang Chủ',
    body: '../index',
    user: req.session.user // Truyền thông tin user từ session
  });
});

// Route cho trang đăng nhập
router.get('/login', (req, res) => {
  res.render('layouts/public-layout', {
    title: 'Đăng nhập',
    body: '../login',
    user: req.session.user // Truyền thông tin user từ session vào EJS
  });
});

// Route xử lý đăng nhập (POST)
router.post('/login', AuthController.login);

router.get('/register', (req, res) => {
  res.render('layouts/public-layout', {
    title: 'Đăng ký',
    body: '../register'  // Đường dẫn tới nội dung của register
  });
});

// Route xử lý đăng ký (POST)
router.post('/register', AuthController.register);

router.get('/admin', (req, res) => {
  res.render('layouts/admin-layout', { 
    title: 'Admin Home', 
    body: '../admin/admin-home'  // Đường dẫn tới file room-types.ejs
  });
});

router.get('/admin/rooms', (req, res) => {
  res.render('layouts/admin-layout', { 
    title: 'Quản lý Phòng', 
    body: '../admin/rooms'  // Đường dẫn tới nội dung chính của trang quản lý phòng
  });
});

router.get('/admin/room-types', (req, res) => {
  res.render('layouts/admin-layout', { 
    title: 'Quản lý Loại Phòng', 
    body: '../admin/room-types'  // Đường dẫn tới file room-types.ejs
  });
});


export default router;
