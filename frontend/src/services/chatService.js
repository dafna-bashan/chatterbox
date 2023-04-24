// import { storageService } from './asyncStorageService';
import { httpService } from './httpService';

export const chatService = {
    query,
    getById,
    remove,
    update
};

window.chatService = chatService;


function query() {
    // return storageService.query('chat')
    return httpService.get(`chat`);
}

function getById(chatId) {
    // return storageService.get('chat', chatId)
    return httpService.get(`chat/${chatId}`);
}


function remove(chatId) {
    // return storageService.remove('chat', chatId)
    return httpService.delete(`chat/${chatId}`);
}

async function update(chat) {
    // const updatedChat = await storageService.put('chat', chat)
    return httpService.put(`chat/${chat._id}`, chat);
}


