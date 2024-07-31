const { createRoom, findRoomById } = require("../repositories/roomRepository");

async function createNewRoom(roomId, users) {
  try {
    const room = await createRoom(roomId, users);
    return room;
  } catch (error) {
    throw error;
  }
}

async function joinRoom(roomId, userId) {
  try {
    const room = await findRoomById(roomId);
    if (!room) throw new Error("Room not found");

    // 2인 이상의 방은 참가할 수 없음
    if (room.users.length >= 2) throw new Error("Room is full");

    room.users.push(userId);
    await room.save(); // repo까지 안가고 그냥 save()만 호출

    return room;
  } catch (error) {
    throw error;
  }
}

module.exports = { createNewRoom, joinRoom };
