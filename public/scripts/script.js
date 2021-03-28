const socket = io();

sendUserIdToSocket = () => {
    const userId = document.getElementById('userId').value;
    socket.emit('new-user', userId);
};

