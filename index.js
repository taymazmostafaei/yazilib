'use strict'

// Connect data base
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect().then(() => {
    global.database = client.db('yazilib');
    console.log('db connected 🔗');
})

// Connect Telegram
const Telegram = require('telegram-node-bot')
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('key')

// Connect Redis
const { createClient } = require('redis');
const redis = createClient({
    url: 'key'
})
redis.on('error', err => console.log('Redis Client Error', err));
redis.connect().then(() => {
    global.redis = redis
    console.log('********************* redis ready **************************');
});

//Load app class
const StartController = require('./controller/Start'),
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
