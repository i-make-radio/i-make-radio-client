const io = require('socket.io-client')

export default (function() {
  const socket = io.connect('http://10.10.213.235:8080')

  const registerReceivedMessage = onMessageReceived => {
    socket.on('new_message', onMessageReceived)
  }

  const unregisterReceivedMessage = () => {
    socket.off('message')
  }

  const registerVolumeChanged = onVolumeChangeReceived => {
    socket.on('volume_changed_subscriber', onVolumeChangeReceived)
  }
  const unregisterVolumeChanged = () => {
    socket.off('volume_changed_subscriber')
  }

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

  const changeStreamVolume = ({ streamVolume, musicVolume }) => {
    socket.emit('volume_changed_publisher', { ...streamVolume, musicVolume })
  }
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
    unregisterReceivedMessage,
    changeStreamVolume,
    registerVolumeChanged,
    unregisterVolumeChanged,
    changeUserName
  }
})()
