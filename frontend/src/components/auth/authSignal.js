import { effect, signal } from '@preact/signals-react';

export const jwtToken = signal(getToken());
export const usertype = signal(getUsertype());


function getToken() {
    const token = sessionStorage.getItem('token');
    return token == null || token === 'null' ? '' : token;
}

function getUsertype() {
    const usertype = sessionStorage.getItem('usertype');
    return usertype || ''; 
}

effect(() => {
    sessionStorage.setItem('token', jwtToken.value);
});

effect(() => {
    sessionStorage.setItem('usertype', usertype.value);
});