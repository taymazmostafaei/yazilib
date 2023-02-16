const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const lyrics = require('../model/Lyrics')

class NewController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    newHandler($) {

        const form = {
            title: {
                q: 'Yazının adını savla',
                error: 'Yanlış sav, yenidən savla:',
                validator: (message, callback) => {
                    if (message.text || (message.text).length > 3) {
                        callback(true, message.text)
                        return
                    }

                    callback(false)
                }
            },

            lyric: {
                q: 'Yazının ... savla',
                error: 'Yanlış sav, yenidən savla:',
                validator: (message, callback) => {
                    if (message.text) {
                        callback(true, message.text)
                        return
                    }

                    callback(false)
                }
            },

            author: {
                q: 'Yazıcının adın savla',
                error: 'Yanlış sav, yenidən savla:',
                validator: (message, callback) => {
                    if (message.text) {
                        callback(true, message.text || (message.text).length > 3)
                        return
                    }

                    callback(false)
                }
            },

            singer: {
                q: 'Xanəndənin adın savla',
                error: 'Yanlış sav, yenidən savla:',
                validator: (message, callback) => {
                    if (message.text) {
                        callback(true, message.text || (message.text).length > 3)
                        return
                    }

                    callback(false)
                }
            },
        }

        $.runForm(form, async (result) => {

            let ly = new lyrics()
            let insertResult = await ly.insertOne({

                title: result.title,
                lyrics: result.lyric,
                singer: result.singer,
                author: result.author
            })

            if (insertResult) {
                $.sendMessage('Uğurla yeni yazi artıldı.')
                return
            }

            $.sendMessage('Uğursuz Artırma.')
        })

    }

    get routes() {
        return {
            'newCommand': 'newHandler'
        }
    }
}

module.exports = NewController