import axios from 'axios';

async function userService(request, type) {
    let url;
    switch (type) {
        case 'login':
            url = '/users/login';
            break;
        case 'signup':
            url = '/users/signup';
            break;
        case 'refresh':
            url = '/users/refreshtoken';
            break;
        default:
            url = null;
            break;
    }
    const response = await axios.post(url, request, {
        headers: { 'Content-Type': 'application/json' },
    });
    const expirationTime = new Date(
        new Date().getTime() + +response.data.expiresIn * 1000
    );
    const tokenData = {
        token: response.data.idToken,
        expirationTime: expirationTime.toISOString(),
        refreshToken: response.data.refreshToken,
    };
    return tokenData;
}

export async function loginService(request) {
    const tokenData = await userService(request, 'login');
    return tokenData;
}

export async function signupService(request) {
    const tokenData = await userService(request, 'signup');
    return tokenData;
}

export async function refreshService(request) {
    const tokenData = await userService(request, 'refresh');
    return tokenData;
}

export async function likeJournal(request) {
    try {
        await axios.post('/users/like/add', request, {
            headers: { 'Content-Type': 'application/json' }});
    } catch(err) {}
}

export async function unlikeJournal(request) {
    try {
        await axios.post('/users/like/remove', request, {
            headers: { 'Content-Type': 'application/json' }});
    } catch(err) {}
}