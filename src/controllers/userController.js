const { userInfo } = require("../services/userService");

async function getMyInfo(req, res) {
  const userId = req.userId;
  try {
    const user = await userInfo(userId);
    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getMyInfo };
