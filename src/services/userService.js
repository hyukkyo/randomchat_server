const { findUserById } = require("../repositories/userRepository");

async function getUserInfo(userId) {
  try {
    const userInfo = await findUserById(userId);
    if (!userInfo) throw new Error("User not found");
    return { email: userInfo.email, name: userInfo.name };
  } catch (error) {
    throw error;
  }
}

module.exports = { getUserInfo };
