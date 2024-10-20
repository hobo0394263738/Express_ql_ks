import UserService from '../services/UserService.js';

class AuthController {
    static async register(req, res) {
        const { username, email, password, confirmPassword } = req.body;

        // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không
        if (password !== confirmPassword) {
            return res.render('layouts/public-layout', { 
                title: 'Đăng ký', 
                body: '../register', 
                error: 'Mật khẩu và xác nhận mật khẩu không khớp' 
            });
        }

        try {
            // Kiểm tra xem email đã được sử dụng chưa
            const existingUser = await UserService.findUserByEmail(email);
            if (existingUser) {
                return res.render('layouts/public-layout', { 
                title: 'Đăng ký', 
                body: '../register', 
                error: 'Email này đã được sử dụng' 
                });
            }

            // Tạo người dùng mới
            const user = await UserService.createUser(username, email, password);

            // Nếu đăng ký thành công, chuyển hướng người dùng đến trang đăng nhập
            return res.redirect('/login');
        } catch (error) {
            return res.render('layouts/public-layout', { 
                title: 'Đăng ký', 
                body: '../register', 
                error: error.message 
            });
        }
    }
}

export default AuthController;
