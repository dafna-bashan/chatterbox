const chatService = require('./chat.service')
// const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getChat(req, res) {
    try {
        const chat = await chatService.getById(req.params.id)
        res.send(chat)
    } catch (err) {
        logger.error('Failed to get chat', err)
        res.status(500).send({ err: 'Failed to get chat' })
    }
}

async function getChats(req, res) {
    try {
        const chats = await chatService.query(req.params.id)
        res.send(chats)
    } catch (err) {
        logger.error('Failed to get chats', err)
        res.status(500).send({ err: 'Failed to get chats' })
    }
}

async function addChat(req, res) {
    try {
        console.log('controller', req.body);
        const savedChat = await chatService.add(req.body)
        res.send(savedChat)
    } catch (err) {
        logger.error('Failed to add chat', err)
        res.status(500).send({ err: 'Failed to add chat' })
    }
}

async function deleteChat(req, res) {
    try {
        await chatService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete chat', err)
        res.status(500).send({ err: 'Failed to delete chat' })
    }
}

async function updateChat(req, res) {
    try {
        const chat = req.body
        const savedChat = await chatService.update(chat)
        res.send(savedChat)
        // socketService.broadcast({type: 'chat-updated', data: review, to:savedChat._id})
    } catch (err) {
        logger.error('Failed to update chat', err)
        res.status(500).send({ err: 'Failed to update chat' })
    }
}

module.exports = {
    getChat,
    getChats,
    addChat,
    deleteChat,
    updateChat
}