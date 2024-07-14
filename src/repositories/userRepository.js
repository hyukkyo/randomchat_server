const User = require('../models/user');

const createUser = async (email, password, name) => {
    try {
        const user = await User.create({ 
            email, 
            password,
            name
        });
        return user;
    } catch (error) {
        throw error;
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            email
        });
        return user;
    } catch (error) {
        throw error;
    }
}

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser, findUserByEmail, findUserById };