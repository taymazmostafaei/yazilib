const Telegram = require('telegram-node-bot')
const lyrics = require('../model/Lyrics')

const TelegramBaseController = Telegram.TelegramBaseController

class OtherWise extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        let lyrics = new lyrics()
        
        $.sendMessage('Axtarmaq başlandı...')

        const lyric = lyrics.findOne(result =>{
            console.log(result);
        });

    }

}

module.exports = OtherWise