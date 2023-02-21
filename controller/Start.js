const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const Admins = require('../model/Admins')


class StartController extends TelegramBaseController {

    async startHandler($){
        $.sendMessage('Xoş gəldin. \naxtarmaqa başla:')

        let redis = global.redis
        let admin = await redis.exists(`admin:${$.chatId}`)

        if (admin) {
            
            return;
        }
        
        let admins = new Admins();
        let result = await admins.findOne({ ChatId : `${$.chatId}` })

        if (result) {

            let redis = global.redis
            await redis.set(`admin:${$.chatId}`, 'editor')
        }
    }

    get routes(){
        return {
            'startCommand' : 'startHandler'
        }
    }
}

module.exports = StartController