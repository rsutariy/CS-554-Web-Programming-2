const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const redis = require('redis');

const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

const client = redis.createClient();

const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const chat = io.of("/chat");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

chat.on('connection', (socket) => {

  socket.on('join', async (request) => {
  
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "SearchImg",
      data: { 
         username: request.username,
         message: request.message,
         query: request.query
      }
  });
    chat.emit('chat', response);
  });
});

http.listen(3000, () => {
  console.log("Server Started");
  console.log("Starting listening on http://localhost:3000/");
});
