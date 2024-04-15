export const getToken = () => sessionStorage.getItem('token');

export const getHeaders = () => {
    const token = getToken();
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};