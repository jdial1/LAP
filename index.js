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

var animals = [
  'Bear','Cat','Duck','Elephant','Giraffe','Hamster',
  'Iguana','Jerboa','Kangaroo','Manatee','Numbat',
  'Otter','Penguin','Quokka','Rabbit','Sheep',
  'Tortoise','Monkey','Weasel','Zebra'
];
var clients ={};
var online =0;
io.on('connection', function(socket) {

    console.log(animals[2]);
    random_animal=animals[Math.floor(Math.random()*animals.length)]+Math.floor(Math.random()*Math.floor(987));
    for (var i = 0; i < clients.length; i++) {
        if (random_animal=clients[i]){
          random_animal=animals[Math.floor(Math.random()*animals.length)]+Math.floor(Math.random()*Math.floor(978));
        }
    }
    clients[socket.id] =random_animal;
    console.log('GET_CLIENT_ID Animal: '+clients[socket.id]);
    console.log('NEW CLIENT: '+clients[socket.id]);
    online++;
    console.log('Client List: '+JSON.stringify(clients,null,1));
    console.log('Online: '+online);
    io.to(socket.id).emit('CLIENT_ID',clients[socket.id]);

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

    socket.on('disconnect', function () {
      socket.emit('disconnected');
      online = online - 1;
      delete clients[socket.id];
    });
});
