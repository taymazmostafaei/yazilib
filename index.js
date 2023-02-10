'use strict'

const Telegram = require('telegram-node-bot')
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram('6193401349:AAEO7PMl78qwyqfqDRaCFcSLbd_S2TqXhbM')

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