const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}


async function query() {
    try {
        const collection = await dbService.getCollection('chat')
        var chats = await collection.find().toArray()
        chats = chats.map(chat => {
            delete chat.password
            chat.createdAt = ObjectId(chat._id).getTimestamp()
            // Returning fake fresh data
            // chat.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
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
    try {
        const collection = await dbService.getCollection('chat')
        await collection.insertOne(chat)
        return chat
    } catch (err) {
        logger.error('cannot insert chat', err)
        throw err
    }
}



