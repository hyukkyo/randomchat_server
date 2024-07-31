const Room = require("../models/room");

const createRoom = async (roomId, users) => {
  try {
    const room = new Room({ roomId, users });
    await room.save();
    return room;
  } catch (error) {
    throw error;
  }
};

const findRoomById = async (roomId) => {
  try {
    return await Room.findOne({ roomId }).populate("users");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRoom,
  findRoomById,
};
