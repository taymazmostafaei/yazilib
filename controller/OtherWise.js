const Telegram = require('telegram-node-bot')
const lyrics = require('../model/Lyrics')

const TelegramBaseController = Telegram.TelegramBaseController

class OtherWise extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        let ly = new lyrics()

        $.sendMessage('Axtarmaq başlandı...')

        ly.findOne()
        .then((result) => {

            console.log(result);
            $.sendMessage(result.title)

        }).catch((err) => {
            console.log(err);
        });;

    }

}

module.exports = OtherWise