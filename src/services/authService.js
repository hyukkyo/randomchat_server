const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByEmail,
} = require("../repositories/userRepository");
const { createAccessToken, createRefreshToken } = require("../utils/jwt");
const {
  saveRefreshToken,
  findRefreshToken,
} = require("../repositories/refreshTokenRepository");

async function registerUser(email, password, name) {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(email, hashedPassword, name);
    return user;
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    await saveRefreshToken(user._id, refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}

async function refreshTokens(refreshToken) {
  try {
    const decoded = jwt.verifyRefreshToken(refreshToken);
    const userId = decoded.id;

    const savedRefreshToken = await findRefreshToken(userId);
    if (savedRefreshToken !== refreshToken)
      throw new Error("Invalid refresh token");

    const newAccessToken = createAccessToken({ id: userId });
    const newRefreshToken = createRefreshToken({ id: userId });

    await saveRefreshToken(userId, newRefreshToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, loginUser, refreshTokens };
