const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../user/user.service')

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}


async function query(userId) {
    try {
        // console.log(userId);
        const collection = await dbService.getCollection('chat')
        var chats = await collection.find({ "members._id": userId }).toArray()
        var users = await userService.query()
        console.log('users', users);
        chats = chats.map(chat => {
            chat.createdAt = ObjectId(chat._id).getTimestamp()
            chat.members = chat.members.map(member => {
                console.log('member', member);
                var user = users.find(user => user._id == member._id)
                console.log('user', user);
                return {
                    ...member,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imgUrl: user.imgUrl
                }
            })
            chat.msgs = chat.msgs.map(msg => {
                var user = users.find(user => user._id == msg.from._id)
                return {
                    ...msg,
                    from: {
                        ...msg.from,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                }
            })
            // Returning fake fresh data
            // chat.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            console.log('chat', chat);
            update(chat)
            return chat
        })
        return chats
    } catch (err) {
        logger.error('cannot find chats', err)
        throw err
    }
}

async function getById(chatId) {
    try {
        const collection = await dbService.getCollection('chat')
        const chat = await collection.findOne({ '_id': ObjectId(chatId) })
        return chat
    } catch (err) {
        logger.error(`while finding chat ${chatId}`, err)
        throw err
    }
}

async function remove(chatId) {
    try {
        const collection = await dbService.getCollection('chat')
        await collection.deleteOne({ '_id': ObjectId(chatId) })
    } catch (err) {
        logger.error(`cannot remove chat ${chatId}`, err)
        throw err
    }
}

async function update(chat) {
    try {
        const chatToSave = { ...chat }
        delete chatToSave._id
        const collection = await dbService.getCollection('chat')
        await collection.updateOne({ _id: ObjectId(chat._id) }, { $set: chatToSave })
        // console.log('updated chat', res);
        return { _id: chat._id, ...chatToSave };
    } catch (err) {
        logger.error(`cannot update chat ${chat._id}`, err)
        throw err
    }
}

async function add(chat) {
    console.log('chat service', chat)
    const members = chat.members.map(member => {
        return {
            _id: member._id,
            firstName: member.firstName,
            lastName: member.lastName,
            imgUrl: member.imgUrl,
            joinedAt: 0,
            leftAt: 0
        }
    })
    const newChat = {
        title: chat.title,
        description: chat.description,
        imgUrl: chat.imgUrl,
        members,
        msgs: []
    }
    try {
        const collection = await dbService.getCollection('chat')
        const savedChat = await collection.insertOne(newChat)
        // console.log(savedChat.insertedId);
        // members.forEach(async (member) => {
        //     if (member.chatsId) member.chatsId.push(savedChat.insertedId)
        //     else member.chatsId = [savedChat.insertedId]
        //     await userService.update(member)
        // });
        console.log('savedChat', savedChat.ops[0]);
        return savedChat.ops[0];
        // return newChat
    } catch (err) {
        logger.error('cannot insert chat', err)
        throw err
    }
}






