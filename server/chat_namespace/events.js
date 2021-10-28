const joinRoom = (socket, namespace) => ({username, room}) => {} // Defined above

const publicMessage = (namspace) => ({room, message, username}) => {
    namespace.sockets.in(room).emit('newMessage', {message, username});
}

const privateMessage = (namspace) => ({privateMessage, to, from, room}) => {
    namespace.to(room).emit('privateMessage', {to, privateMessage, from, room})
}
const leaveRoom = (socket, namespace) => ({room, username}) => {
    socket.leave(room, () => {
        let usersRoom = user[room]
        usersRoom = usersRoom.filter((user) => (user.username !== username)) // delete user from array
        namspace.sockets.in(room).emit('newUser', usersRoom); // To all the users in the sa\\me room
    })
}
const joinPrivateRoom = (socket, namespace) => ({username, room, to}) => {
    socket.join(to, () => {
        if (room !== null) {
            let usersRoom = users[room];
            let userToTalk = usersRoom.find(user => user.username === to)

            if (userToTalk.privateChat) {
                namespace.to(to).emit('leavePrivateRoom', { to, room, from: username,
                privateMessage: `${to} is already talking`,
            })
            socket.leave(to, () => {
                console.log(`user ${username} forced to left the room ${to}`);
            })
            return;
            }
            // If the user is not talking we update the flag and notify other user
            user.ToTalk.privateChat = true
            namespace.sockets.in(room).emit('privateChat', {username, to});
        }
    })
}
const leavePrivateRoom = (socket, namespace) => ({room, from, to}) => {
    let usersRoom = users[room];
    let userToTalk = usersRoom.find(user => user.username === to)
    // Update the flag and notify the other user
    userToTalk.privateChat = false
    namspace.to(to).emit('leavePrivateRoom', { to, from, privateMessage: `${to} has closed the chat.` })
    socket.leave(to, () => {
        console.log(`user ${from} left the private chat with ${to}`);
    })
}