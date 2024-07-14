const bcrypt = require('bcrypt');
const { createUser, findUserByEmail } = require('../repositories/userRepository');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

async function registerUser(email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
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
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);
        return { accessToken, refreshToken };
    } catch (error) {
        throw error;
    }
}

async function accessToken(refreshToken) {
    try {
        const user = await findUserByRefreshToken(refreshToken);
        if (!user) {
            throw new Error('Invalid refresh token');
        }

        const newAccessToken = createAccessToken(user._id);
        return { accessToken: newAccessToken };
    } catch (error) {
        throw error;
    }
}

module.exports = { registerUser, loginUser, accessToken };