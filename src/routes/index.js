import express from 'express';

const router = express.Router();

// Route cho trang chủ
router.get('/', (req, res) => {
  res.render('index', { title: 'Trang Chủ' });
});

// Route cho trang đăng nhập
router.get('/login', (req, res) => {
  res.render('login', { title: 'Đăng nhập' });
});

// Route cho trang đăng ký
router.get('/register', (req, res) => {
  res.render('register', { title: 'Đăng ký' });
});

export default router;
