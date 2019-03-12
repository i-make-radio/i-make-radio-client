import React, { Component } from 'react';
import './App.css';


class Subscriber extends Component {
componentDidMount()  {
			const red5prosdk = window.red5prosdk

        this.rtcSubscriber = new red5prosdk.RTCSubscriber();
        var config = {
          protocol: 'ws',
          host: 'localhost',
          port: 5080,
          app: 'live',
          streamName: 'mystream',
          rtcConfiguration: {
            iceServers: [{urls: 'stun:stun2.l.google.com:19302'}],
            iceCandidatePoolSize: 2,
            bundlePolicy: 'max-bundle'
          } // See https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection#RTCConfiguration_dictionary
        };
          this.initializeStream = this.rtcSubscriber.init(config)
          .then(()=>true)
          .catch((err)=>{
              console.log('Could not play: ' + err);
              return false
          })
}
subscribeVideo = () => {
if(this.initializeStream){

console.log('playing subscription')  
return this.rtcSubscriber.subscribe();
}

}
componentWillUnmount() {
  this.rtcSubscriber.unsubscribe()

}
  render() {

console.log('rendering')
  	return(
	  	<div>
	  	      <h1>Subscriber</h1>
	  	      	<button onClick={this.subscribeVideo}>HELLO</button>
	      <video id="red5pro-subscriber" width="640" height="480" controls></video>
	    </div>
    	)
	}
}

export default Subscriber