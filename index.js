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

//Load app class
const  StartController = require('./controller/Start'),
    OtherWiseController = require('./controller/OtherWise'),
    PingController = require('./controller/Ping');


tg.router
    .when(
        new TextCommand('ping', 'pingCommand'),
        new PingController()
    )
    .when(
        new TextCommand('start', 'startCommand'),
        new StartController()
    ).otherwise(
       new OtherWiseController()
    )