const { createNewRoom, joinRoom } = require("../services/roomService");
const { v4: uuidv4 } = require("uuid");

async function postNewRoom(req, res) {
  const roomId = uuidv4();
  const userId = req.userId;
  try {
    const room = await createNewRoom(roomId, [userId]);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getRoom(req, res) {
  const { roomId } = req.params;
  const userId = req.userId;
  try {
    const room = await joinRoom(roomId, userId);
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { postNewRoom, getRoom };
