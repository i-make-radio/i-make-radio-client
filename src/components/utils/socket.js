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
  const registerstreamVolumeChanged = onVolumeChangeReceived => {
    socket.on('volume_changed_subscriber', onVolumeChangeReceived)
  }
  const unregisterstreamVolumeChanged = () => {
    socket.off('volume_changed_subscriber')
  }


  const registerOnStartPlaying = onStartPlaying => {
    socket.on('startPlayingSubscriber', onStartPlaying)
  }

  const unregisterOnStartPlaying = () => {
    socket.off('startPlayingSubscriber')
  }


  const registerOnStopPlaying = onStopPlaying => {
    socket.on('stopPlayingSubscriber', onStopPlaying)
  }

  const unregisterOnStopPlaying = () => {
    socket.off('stopPlayingSubscriber')
  }

  socket.on('error', function(err) {
    console.log(err)
  })

  const registerPlayingSubscriber = cb => {
    socket.on('startPlayingSubscriber', cb)
  }
  const unregisterPlayingSubscriber = () => {
    socket.off('startPlayingSubscriber')
  }

  const registerStopSubscriber = cb => {
    socket.on('stopPlayingSubscriber', cb)
  }

  const unregisterStopSubscriber = () => {
    socket.off('stopPlayingSubscriber')
  }

  //   function register(name, cb) {
  //     socket.emit('register', name, cb)
  //   }

  //   function join(chatroomName, cb) {
  //     socket.emit('join', chatroomName, cb)
  //   }

  //   function leave(chatroomName, cb) {
  //     socket.emit('leave', chatroomName, cb)
  //   }

  const changeStreamVolume = data => {
    socket.emit('volumeChangePublisher', data)
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
    changeUserName,
    registerPlayingSubscriber,
    unregisterPlayingSubscriber,
    registerStopSubscriber,
    unregisterStopSubscriber,
    registerstreamVolumeChanged,
    unregisterstreamVolumeChanged,
    registerOnStartPlaying,
    unregisterOnStartPlaying,
    registerOnStopPlaying,
    unregisterOnStopPlaying,
  }
})()
