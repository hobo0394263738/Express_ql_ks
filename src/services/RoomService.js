import Room from '../models/Room.js';
import RoomType from '../models/RoomType.js';

class RoomService {
  static async getAllRooms() {
    try {
      const rooms = await Room.findAll({
        include: [{
          model: RoomType,
          as: 'RoomType'
        }]
      });
      return rooms
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách phòng: ${error.message}`);
    } 
  }

  static async createRoom({ room_number, room_type_id, status }) {
    try {
      const newRoom = await Room.create({
        room_number,
        room_type_id,
        status
      });
      return newRoom;
    } catch (error) {
      throw new Error(`Lỗi khi thêm phòng: ${error.message}`);
    }
  }
}

export default RoomService;
