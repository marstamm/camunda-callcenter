var JsSIP = require('jssip')

// Create our JsSIP instance and run it:

var socket = new JsSIP.WebSocketInterface('wss://edge.sip.onsip.com');
// socket.via_transport = "tcp";

var configuration = {
  sockets  : [ socket ],
  uri      : 'sip:493098407495@sip.alice-voip.de',
  password : 'uniVPhPVBaRlHH8y'
};

var ua = new JsSIP.UA(configuration);

ua.start();

console.log(ua);

// Register callbacks to desired call events
var eventHandlers = {
  'progress': function(e) {
    console.log('call is in progress', e);
  },
  'failed': function(e) {
    console.log('call failed with cause: ', e);
  },
  'ended': function(e) {
    console.log('call ended with cause: ', e);
  },
  'confirmed': function(e) {
    console.log('call confirmed', e);
  }
};

var options = {
  'eventHandlers'    : eventHandlers,
  'mediaConstraints' : { 'audio': true, 'video': false }
};

var session = ua.call('sip:015906106969@sip.alice-voip.de', options);