const users = [
    { id: 1, username: 'admin', password: 'password', roles: ['admin'] }
];

export const authenticateUser = (username, password) => {
    return users.find(user => user.username === username && user.password === password);
};
