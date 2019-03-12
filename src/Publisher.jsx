import React, { Component } from 'react';

class Publisher extends Component {
  componentDidMount() {
    const red5prosdk = window.red5prosdk
    this.rtcPublisher = new red5prosdk.RTCPublisher();
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

        this.rtcPublisher.init(config)
          .then( ()=> {
            // On broadcast started, subscribe.
            return this.rtcPublisher.publish();
          })
          .then(function () {
            console.log('Publishing!');
          })
          .catch(function (err) {
            console.error('Could not publish: ' + err);
          });

  }

  componentWillUnmount() {
    this.rtcPublisher.unpublish()
  }
render() {
	
return(
	<div>
      <h1>Publisher</h1>
      <video id="red5pro-publisher" width="640" height="480" muted autoPlay></video>
      </div>

)
      }
    }

export default Publisher