const Room = require("../models/room");

const createRoom = async (roomId, users) => {
  const room = new Room({ roomId, users });
  await room.save();
  return room;
};

const findRoomById = async (roomId) => {
  return await Room.findOne({ roomId }).populate("users");
};

module.exports = {
  createRoom,
  findRoomById,
};
