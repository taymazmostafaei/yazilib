const Telegram = require('telegram-node-bot')
const lyrics = require('../model/Lyrics')
const ejs = require('ejs');
const ObjectID = require('mongodb').ObjectID;
var ShortId = require('id-shorter');
var mongoDBId = ShortId({
    isFullId: true
});

const TelegramBaseController = Telegram.TelegramBaseController

class OtherWise extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    async handle($) {
        
        if (($.message.text).length < 3) {

            await $.sendMessage('🤏')
            await $.sendMessage('axtarmaq üçün azı 3 karakter gələklidir.')
            return;
        }

        if (($.message.text).length >= 50) {
            $.sendPhoto({ path: './media/cat-walking.mp4' })
            $.sendMessage('Qısa yazın.')
            return;
        }

        let ly = new lyrics()
        if (($.message.text).split('_')[0] == '/g') {

            let sId = ($.message.text).split('_')[1]
            let lyricsId = mongoDBId.decode(sId)

            let lyric = await ly.findOne({ _id: ObjectID(lyricsId) })

            ejs.renderFile('./template/lyric.ejs', { lyric: lyric}, null, (err, message) => {
                $.sendMessage(message || err)
            });
            return;
        }

        await $.sendMessage('Axtarmaq başlandı🔎')

        let result = await ly.find({ $text: { $search: $.message.text } }).toArray()

        if (result.length == 0) {

            $.sendPhoto({ path: './media/notfound.gif' })
            $.sendMessage('Heç nə tapılmadi.')
            return;
        }

        ejs.renderFile('./template/search.ejs', { lyrics: result, search: mongoDBId }, null, (err, message) => {
            $.sendMessage(message || err)
        });

    }

}

module.exports = OtherWise
