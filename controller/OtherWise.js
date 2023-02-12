const Telegram = require('telegram-node-bot')
const lyrics = require('../model/Lyrics')
const ejs = require('ejs');

const TelegramBaseController = Telegram.TelegramBaseController

class OtherWise extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    async handle($) {
        let ly = new lyrics()

        await $.sendMessage('Axtarmaq başlandı🔎')

        let result = await ly.find({ $text: { $search: $.message.text } }).toArray()

        if (result.length == 0) {

            $.sendPhoto({ path: './media/notfound.gif' })
            $.sendMessage('Heç nə tapılmadi.')
            return;
        }

        ejs.renderFile('./template/search.ejs', { lyrics: result }, null, (err, message) => {
            $.sendMessage(message || err)
        });

    }

}

module.exports = OtherWise