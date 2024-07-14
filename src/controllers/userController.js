const { getUserInfo } = require('../services/userService');

async function userInfo(req, res) {
    try {
        const userInfo = await getUserInfo(req.user.userId);
        res.status(200).json({ 
            message: 'User found', 
            userInfo
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { userInfo };