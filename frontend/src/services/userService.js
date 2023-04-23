// import { storageService } from './asyncStorageService';
import { httpService } from './httpService';

export const userService = {
    getUsers,
    getById,
    remove,
    update
};

window.userService = userService;


function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`);
}

function getById(userId) {
    // return storageService.get('user', userId)
    return httpService.get(`user/${userId}`);
}


function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`);
}

async function update(user) {
    // const updatedUser = await storageService.put('user', user)
    const updatedUser = await httpService.put(`user/${user._id}`, user);
    sessionStorage.setItem('loggedinUser', JSON.stringify(updatedUser));
}


