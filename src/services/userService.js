const { findUserById } = require("../repositories/userRepository");

async function userInfo(userId) {
  try {
    const user = await findUserById(userId);
    if (!user) throw new Error("User not found");
    return { email: user.email, name: user.name };
  } catch (error) {
    throw error;
  }
}

module.exports = { userInfo };
