import RoomService from '../services/RoomService.js';
import RoomTypeService from '../services/RoomTypeService.js'; 

class RoomController {
  // Hiển thị trang quản lý phòng
  static async renderRoomsPage(req, res) {
    try {
      const rooms = await RoomService.getAllRooms(); // Lấy danh sách phòng từ service
      res.render('layouts/admin-layout', {
        title: 'Quản lý Phòng',
        body: '../admin/rooms',  // Passing the body template path
        rooms                    // Passing the rooms data
      });
    } catch (error) {
      res.render('layouts/admin-layout', {
        title: 'Quản lý Phòng',
        body: '../admin/rooms',
        error: 'Có lỗi xảy ra khi lấy dữ liệu phòng'  // Hiển thị thông báo lỗi nếu có
      });
    }
  }

  // Render the "Add Room" page within the layout
  static async renderAddRoomPage(req, res) {
    try {
      const roomTypes = await RoomTypeService.getAllRoomTypes(); // Fetch all room types for selection
      res.render('layouts/admin-layout', { 
        title: 'Thêm Phòng', 
        body: '../admin/add-room', // Path to the EJS template for the add-room page
        roomTypes
      });
    } catch (error) {
      res.render('layouts/admin-layout', {
        title: 'Thêm Phòng',
        body: '../admin/add-room',
        error: 'Có lỗi xảy ra khi tải trang'
      });
    }
  }

  // Handle adding a new room
  static async addRoom(req, res) {
    const { room_number, room_type_id, status } = req.body;

    // Basic validation
    if (!room_number || !room_type_id) {
      req.session.error = 'Vui lòng điền đầy đủ thông tin cần thiết';
      return res.redirect('/admin/room/add');
    }

    try {
      await RoomService.createRoom({ room_number, room_type_id, status });
      req.session.success = 'Phòng đã được thêm thành công';
      return res.redirect('/admin/rooms');
    } catch (error) {
      req.session.error = `Có lỗi xảy ra: ${error.message}`;
      return res.redirect('/admin/room/add');
    }
  }
}

export default RoomController;
