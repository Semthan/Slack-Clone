exports = module.exports = (io) => {

    let users = {}

    io.on('connection', (socket) => {
        socket.on('new-user', (userId) => {
            const chName = (socket.handshake.headers.referer);
            users[socket.id] = {userId,chName}
            socket.leaveAll()
            socket.join(chName)
            //display when a user connect
            io.emit('user-connected', users)
        })

        socket.on('disconnect', () => {
            if(users && users[socket.id]){
                delete users[socket.id]
                io.emit('user-diconnected', users)
            }
        })
    })
};