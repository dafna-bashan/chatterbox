const logger = require('./logger.service')

var gIo = null

var userSocketMap = {}
var chatUserMap = {}

function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        logger.info(`New connected socket [id: ${socket.id}]`)
        socket.on('disconnect', socket => {
            logger.info(`Socket disconnected [id: ${socket.id}]`)

        })
        socket.on('chat-set-chatId', ({chatsId, userId}) => {

            // if (socket.myChatId === chatId) return
            // if (socket.myChatId) {
            //     socket.leave(socket.myChatId)
            //     logger.info(`Socket is leaving chatId ${socket.myChatId} [id: ${socket.id}]`)

            // }
            // console.log(user.chatsId);
            if (chatsId?.length) {
                chatsId.forEach(chatId => {
                    socket.join(chatId)
                    logger.info(`Socket is joining chatId ${chatId} [id: ${socket.id}]`)
                    if (chatUserMap[chatId] && !chatUserMap[chatId].includes(userId)) chatUserMap[chatId].push(userId)
                    else chatUserMap[chatId] = [userId]
                })
            }
            console.log('chatUserMap', chatUserMap);
            // socket.myChatId = chatId
            // logger.info(`Socket is joining chatId ${socket.myChatId} [id: ${socket.id}]`)

        })
        socket.on('chat-send-msg', ({ chatId, msg }) => {
            // logger.info(`New chat msg from socket [id: ${socket.id}], emitting to chatId ${socket.myChatId}`)
            logger.info(`New chat msg from socket [id: ${socket.id}], emitting to chatId ${chatId} msg:${msg}`)

            //TODO - EMIT ONLY TO SOCKETS IN THE SAME CHAT - check for bugs

            // emits to all sockets:
            // gIo.emit('chat-add-msg', chatId)
            // emits to all sockets except the sender
            // socket.broadcast.emit('chat-add-msg', chatId)
            // emits only to sockets in the same chat
            // gIo.to(socket.myChatId).emit('chat-add-msg', chatId)
            // emits only to sockets in the same chat except the sender
            // socket.broadcast.to(socket.myChatId).emit('chat-add-msg', chatId)
            socket.broadcast.to(chatId).emit('chat-add-msg', chatId)
        })
        socket.on('start-new-chat', data => {
            logger.info(`Start new chat [id: ${socket.id}], emitting to chatId ${data.chatId} userId${data.toUserId}`)
            // console.log('start new chat', data.chatId, data.toUserId);
            const recipientSocketId = userSocketMap[data.toUserId]
            // console.log('user socket map', userSocketMap);

            if (recipientSocketId) {
                console.log('new chat');
                // socket.join(chatId)
                socket.broadcast.to(recipientSocketId).emit('added-to-new-chat', data.chatId)
            }
        })
        // socket.on('user-watch', userId => {
        //     logger.info(`user-watch from socket [id: ${socket.id}], on user ${userId}`)
        //     socket.join('watching:' + userId)

        // })
        socket.on('set-user-socket', userId => {
            logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
            socket.userId = userId
            userSocketMap[userId] = socket.id
            console.log('user socket map', userSocketMap);

        })
        socket.on('unset-user-socket', userId => {
            logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
            userSocketMap[userId] = null
            delete socket.userId
        })

    })
}

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label.toString()).emit(type, data)
    else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
    userId = userId.toString()
    const socket = await _getUserSocket(userId)

    if (socket) {
        // logger.info(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`)
        console.log(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`);

        socket.emit(type, data)
    } else {
        // logger.info(`No active socket for user: ${userId}`)
        console.log(`No active socket for user: ${userId}`);
        // _printSockets()
    }
}

// If possible, send to all sockets BUT not the current socket 
// Optionally, broadcast to a room / to all
async function broadcast({ type, data, room = null, userId }) {
    userId = userId.toString()

    // logger.info(`Broadcasting event: ${type}`)
    console.log(`Broadcasting event: ${type}`);

    const excludedSocket = await _getUserSocket(userId)
    if (room && excludedSocket) {
        // logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
        console.log(`Broadcast to room ${room} excluding user: ${userId}`);

        excludedSocket.broadcast.to(room).emit(type, data)
    } else if (excludedSocket) {
        // logger.info(`Broadcast to all excluding user: ${userId}`)
        console.log(`Broadcast to all excluding user: ${userId}`);

        excludedSocket.broadcast.emit(type, data)
    } else if (room) {
        // logger.info(`Emit to room: ${room}`)
        console.log(`Emit to room: ${room}`);

        gIo.to(room).emit(type, data)
    } else {
        // logger.info(`Emit to all`)
        console.log(`Emit to all`);

        gIo.emit(type, data)
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets()
    const socket = sockets.find(s => s.userId === userId)
    return socket
}
async function _getAllSockets() {
    // return all Socket instances
    const sockets = await gIo.fetchSockets()
    return sockets
}

async function _printSockets() {
    const sockets = await _getAllSockets()
    console.log(`Sockets: (count: ${sockets.length}):`)
    sockets.forEach(_printSocket)
}
function _printSocket(socket) {
    console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
}

module.exports = {
    // set up the sockets service and define the API
    setupSocketAPI,
    // emit to everyone / everyone in a specific room (label)
    emitTo,
    // emit to a specific user (if currently active in system)
    emitToUser,
    // Send to all sockets BUT not the current socket - if found
    // (otherwise broadcast to a room / to all)
    broadcast,
}
