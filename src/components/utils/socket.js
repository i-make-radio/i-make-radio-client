const io = require('socket.io-client')

export default function() {
    const socket = io.connect('http://localhost:8080')

    function registerReceivedMessage(onMessageReceived) {
        socket.on('new_message', onMessageReceived)
    }

    //   function unregisterHandler() {
    //     socket.off('message')
    //   }

    socket.on('error', function(err) {
        console.log('received socket error:')
        console.log(err)
    })

    socket.on('startPlayingPublisher', data => {
        console.log('GOT FROM SUB startPlayingPublisher', data)
    })

    socket.on('stopPlayingPublisher', data => {
        console.log('GOT FROM SUB stopPlayingPublisher', data)
    })

    socket.on('resumePlayingPublisher', data => {
        console.log('GOT FROM SUB resumePlayingPublisher', data)
    })

    //   function register(name, cb) {
    //     socket.emit('register', name, cb)
    //   }

    //   function join(chatroomName, cb) {
    //     socket.emit('join', chatroomName, cb)
    //   }

    //   function leave(chatroomName, cb) {
    //     socket.emit('leave', chatroomName, cb)
    //   }
    //   function getChatrooms(cb) {
    //     socket.emit('chatrooms', null, cb)
    //   }

    function message(message) {
        socket.emit('new_message', { message })
    }

    function changeUserName(username) {
        socket.emit('change_username', { username })
    }

    return {
        // register,
        // join,
        // leave,
        message,
        registerReceivedMessage,
        // getAvailableUsers,
        // registerHandler,
        changeUserName
    }
}