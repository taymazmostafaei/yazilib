
class Admin {

    constructor($, ly, ObjectID, mongoDBId) {

        this.ly = ly
        this.$ = $
        this.ObjectID = ObjectID
        this.mongoDBId = mongoDBId
    }

    async editLyrics() {

        if (await global.redis.exists(`admin:${this.$.chatId}`)) {
            this.$.runInlineMenu({
                layout: 2,
                method: 'sendMessage',
                params: ['görünmələr:'],
                menu: [
                    {
                        text: 'Yenilə',
                        message: 'Hankisin Yeni ləmək istiyirsən?',
                        layout: 4,
                        menu: [
                            {
                                text: "Adını",
                                callback: () => {
                                    this.$.runForm(titleForm, async (result) => {

                                        this.$.sendMessage('yep')
                                    })
                                }
                            },
                            {
                                text: "Bədənin",
                                callback: () => {
                                    this.$.runForm(LyricsForm, async (result) => {

                                        this.$.sendMessage(this.$.message.text)
                                    })
                                }
                            },
                            {
                                text: "Yazıçını",
                                callback: () => {
                                    this.$.runForm(AuthorForm, async (result) => {

                                        this.$.sendMessage('yep')
                                    })
                                }
                            },
                            {
                                text: "Xanəndəni",
                                callback: () => {
                                    this.$.runForm(SingerForm, async (result) => {

                                        this.$.sendMessage('yep')
                                    })
                                }
                            },
                        ]
                    },
                    {
                        text: 'Sil',
                        message: 'Silin sin ?!',
                        layout: 2,
                        menu: [
                            {
                                text: 'Hən',
                                callback: async () => {

                                    let sId = (this.$.message.text).split('_')[1]
                                    let lyricsId = this.mongoDBId.decode(sId)

                                    let result = await this.ly.deleteOne({ _id: this.ObjectID(lyricsId) })
                                    if (!result) {

                                        this.$.sendMessage('❗ Uğursuz Oldu.')
                                        return
                                    }

                                    this.$.sendMessage('✅ Uğurla yazi silindi.')
                                }
                            },
                            {
                                text: 'Yox',
                                callback: () => {

                                    this.$.sendMessage('OK')
                                }
                            }
                        ]
                    }
                ]
            })
        }
    }
}


// forms
const titleForm = {
    title: {
        q: 'Yazının yeni adını savla:',
        error: 'Yanlış sav, yenidən savla:',
        validator: (message, callback) => {
            if (message.text || (message.text).length > 3) {
                callback(true, message.text)
                return
            }

            callback(false)
        }
    }
}

const LyricsForm = {
    lyric: {
        q: 'Yazının yeni bədənin savla',
        error: 'Yanlış sav, yenidən savla:',
        validator: (message, callback) => {
            if (message.text) {
                callback(true, message.text)
                return
            }

            callback(false)
        }
    }
}

const AuthorForm = {
    author: {
        q: 'Yazıcının yeni adın savla',
        error: 'Yanlış sav, yenidən savla:',
        validator: (message, callback) => {
            if (message.text) {
                callback(true, message.text || (message.text).length > 3)
                return
            }

            callback(false)
        }
    }
}

const SingerForm = {
    singer: {
        q: 'Xanəndənin yeni adın savla',
        error: 'Yanlış sav, yenidən savla:',
        validator: (message, callback) => {
            if (message.text) {
                callback(true, message.text || (message.text).length > 3)
                return
            }

            callback(false)
        }
    }
}

module.exports = Admin