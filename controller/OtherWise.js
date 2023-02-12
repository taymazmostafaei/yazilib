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

        ly.findOne()
        .then((result) => {

            let people = ['geddy', 'neil', 'alex'];


            ejs.renderFile('../template/search.ejs', {people: people}, null, (err, message)=>{
                $.sendMessage(message || err)
            });


            //$.sendMessage(result.title)

        }).catch((err) => {
            console.log(err);
        });

    }

}

module.exports = OtherWise