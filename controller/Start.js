const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

class StartController extends TelegramBaseController {

    startHandler(){
        $.sendMessage('Xoş gəldin. \n axtarmaqa başla:')
    }

    get routes(){
        return {
            'startCommand' : 'startHandler'
        }
    }
}

module.exports = StartController