const express = require('express');
const app = express();
const port = 3000;

// Thiết lập route cơ bản
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Máy chủ lắng nghe tại cổng đã chỉ định
app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});
