import { effect, signal } from '@preact/signals-react';

export const jwtToken = signal(getToken());

function getToken() {
    const token = sessionStorage.getItem('token');
    return token == null || token === 'null' ? '' : token;
}

effect(() => {
    sessionStorage.setItem('token', jwtToken.value);
});