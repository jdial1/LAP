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
const server = app.listen(port, () => console.log('App Started',port));

const io = require('socket.io')(server);

var robotName = [
  'Beep','Bop','Boop','Zing','Zap','Deet',
  'Doot','Micro','Bult','Ratchet','Tink',
  'Gadget','Rust '
];

var clients ={};
var online =0;

function user_count(inc,socket){

  if(inc){
    online++;
    io.emit('USER_COUNT_UPDATE',[online,clients]);
    return;
  }
  console.log('INC',inc);
  online--;
  for (i = 0; i < Object.keys(clients).length; i++) {
    console.log('Removal');
    console.log(online);
    console.log(clients[Object.keys(clients)[i]]);
    console.log(socket.id);

    if(clients[Object.keys(clients)[i]].socket == socket.id){
      delete clients[[Object.keys(clients)[i]]];
    }
  }

  io.emit('USER_COUNT_UPDATE',[online,clients]);
  return;
};


io.on('connection', function(socket) {

    console.log(robotName[2]);
    random_robotName=robotName[Math.floor(Math.random()*robotName.length)]+Math.round(Math.random())+Math.round(Math.random())+Math.round(Math.random())+Math.round(Math.random());

    clients[random_robotName] = {'name':random_robotName,'socket':socket.id,'looking_for_opp':false,};
    console.log('GET_CLIENT_ID robotName: '+clients[random_robotName].name);
    io.to(socket.id).emit('CLIENT_ID',clients[random_robotName]);
    user_count(1);
    console.log('Online: '+online);

    socket.on('SEND_GUESS', function(data) {
        console.log('SEND_GUESS');
        console.log(data);
        console.log('SENDING to:'+clients[data[5]].name);
        if(data[5] != 0){io.to(clients[data[5]].socket).emit('GUESS',data)};
    });

    socket.on('CLIENT_GUESS_RESPONSE', function(data) {
      console.log('CLIENT_GUESS_RESPONSE',data);
      console.log('Sending SERVER_GUESS_RESPONSE to: ',clients[data[3]].name);
      if(data[3] != 0){io.to(clients[data[3]].socket).emit('SERVER_GUESS_RESPONSE',data)};
    });

    socket.on('SET_LOOKING_FOR_OPP_FLAG', function(data) {
      console.log('SET_LOOKING_FOR_OPP_FLAG',data);
      try{
      clients[data.name].looking_for_opp = data.looking_for_opp;
      io.emit('USER_COUNT_UPDATE',[online,clients]);
    }
    catch (e) {
      console.log(e);
    }
    });

    socket.on('disconnect', function () {
      socket.emit('disconnected');
      user_count(0,socket);
    });
});
