const { getUserInfo } = require('../services/userService');

async function userInfo(req, res) {
    const userId = req.userId
    try {
        const userInfo = await getUserInfo(userId);
        res.status(200).json({ 
            message: 'User found', 
            userInfo
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { userInfo };