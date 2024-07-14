const { findUserById } = require('../repositories/userRepository');

async function getUserInfo(req, res) {
    try {
        const userInfo = await findUserById(req.user.userId);
        res.status(200).json({ 
            message: 'User found',
            userInfo
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getUserInfo }