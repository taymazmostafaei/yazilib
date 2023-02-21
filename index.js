'use strict'

// Connect data base
const { MongoClient } = require("mongodb");
const uri =
  "mongodb://root:5hqZMpJiiUtlOhszqxH6iOsn@may.iran.liara.ir:30332/my-app?authSource=admin&replicaSet=rs0&directConnection=true";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect().then(()=>{
    global.database = client.db('yazilib');
    console.log('db connected 🔗');
})

// Connect Telegram
const Telegram = require('telegram-node-bot')
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('6193401349:AAEO7PMl78qwyqfqDRaCFcSLbd_S2TqXhbM')

// Connect Redis
const { createClient } = require('redis');
const redis = createClient({
    url: 'redis://:G7Y0rXDnuJGZxFl6UFdwFeLF@may.iran.liara.ir:34132/0'
  })
redis.on('error', err => console.log('Redis Client Error', err));
redis.connect().then(()=>{
    global.redis = redis
    console.log('redis is ready.');
});

//Load app class
const  StartController = require('./controller/Start'),
    OtherWiseController = require('./controller/OtherWise'),
    NewController = require('./controller/new'),
    PingController = require('./controller/Ping');


tg.router
    .when(
        new TextCommand('ping', 'pingCommand'),
        new PingController()
    )
    .when(
        new TextCommand('new', 'newCommand'),
        new NewController()
    )
    .when(
        new TextCommand('start', 'startCommand'),
        new StartController()
    ).otherwise(
       new OtherWiseController()
    )