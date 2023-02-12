const Telegram = require('telegram-node-bot')
const lyrics = require('../model/Lyrics')
const ejs = require('ejs');

const TelegramBaseController = Telegram.TelegramBaseController

class OtherWise extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    handle($) {
        let ly = new lyrics()

        $.sendMessage('Axtarmaq başlandı🔎')

        ly.find({$text:{$search:`${$.message}`}})
        .then((result) => {

            if (!result) {
                $.sendPhoto(InputFile.byFilePath('./media/notfound.gif'))
                $.sendMessage('Heç nə tapılmadi.')
                return;
            }

            ejs.renderFile('./template/search.ejs', {lyrics: result}, null, (err, message)=>{
                $.sendMessage(message || err)
            });


        }).catch((err) => {
            console.log(err);
        });

    }

}

module.exports = OtherWise