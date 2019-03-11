const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.static("."));

//Index Route
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, "./index.html"));
});

// Initialize app
const server = app.listen(port, () => console.log('App Started'));

const io = require('socket.io')(server);

var clients =[];

io.on('connection', function(socket) {

    socket.on('GET_CLIENT_ID',function(){
      console.log('GET_CLIENT_ID');
      console.log('NEW CLIENT: '+socket.id);
      io.to(socket.id).emit('CLIENT_ID',socket.id);
    });

    socket.on('SEND_GUESS', function(data) {
        console.log('SEND_GUESS');
        console.log(data);
        console.log('SENDING to:'+data[5]);
        if(data[5] != 0){io.to(data[5]).emit('GUESS',data)};
    });

    socket.on('CLIENT_GUESS_RESPONSE', function(data) {
      console.log('CLIENT_GUESS_RESPONSE',data);
      console.log('Sending SERVER_GUESS_RESPONSE to: ',data[3]);
      if(data[3] != 0){io.to(data[3]).emit('SERVER_GUESS_RESPONSE',data)};
    });
});
