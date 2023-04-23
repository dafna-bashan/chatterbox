const bcrypt = require('bcrypt')
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-1234')


async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`);
    email = email.toLowerCase()
    const user = await userService.getByEmail(email);
    if (!user) {
        console.log('line 10 Auth service - wrong cred!!!!')
        return Promise.reject('Invalid email or password');
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password;
    return user;
}

async function signup(userCred) {
    console.log('auth service', userCred)
    userCred.email = userCred.email.toLowerCase()
    const { email, firstName, lastName, password } = userCred
    logger.debug(
        `auth.service - signup with email: ${email}, fullname: ${firstName} ${lastName}`
    );
    if (!email || !password || !firstName || !lastName) {
        return Promise.reject('fullname, email and password are required!');
    }
    const users = await userService.query()
    const isUserExist = users.find(user => user.email === email)
    if (isUserExist) return Promise.reject('email already exists')

    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ ...userCred, password: hash })
}

function getLoginToken(user) {
    const userInfo = { _id: user._id, fullname: user.firstName + user.lastName }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
};
