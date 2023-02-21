
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

                                        const updateDoc = {
                                            $set: {
                                                title: result.title,
                                            },
                                        };

                                        let sId = (this.$.message.text).split('_')[1]
                                        let lyricsId = this.mongoDBId.decode(sId)
    
                                        let isUpdated = await this.ly.updateOne({ _id: this.ObjectID(lyricsId) }, updateDoc)
                                        if (isUpdated) {

                                            this.$.sendMessage('✅ Uğurla günləşdi.')
                                            return
                                        }
                                        this.$.sendMessage('❗ Uğursuz Oldu.')

                                    })
                                }
                            },
                            {
                                text: "Bədənin",
                                callback: () => {
                                    this.$.runForm(LyricsForm, async (result) => {

                                        const updateDoc = {
                                            $set: {
                                                lyrics: result.lyric,
                                            },
                                        };

                                        let sId = (this.$.message.text).split('_')[1]
                                        let lyricsId = this.mongoDBId.decode(sId)
    
                                        let isUpdated = await this.ly.updateOne({ _id: this.ObjectID(lyricsId) }, updateDoc)
                                        if (isUpdated) {

                                            this.$.sendMessage('✅ Uğurla günləşdi.')
                                            return
                                        }
                                        this.$.sendMessage('❗ Uğursuz Oldu.')
                                    })
                                }
                            },
                            {
                                text: "Yazıçını",
                                callback: () => {
                                    this.$.runForm(AuthorForm, async (result) => {

                                        const updateDoc = {
                                            $set: {
                                                author: result.author,
                                            },
                                        };

                                        let sId = (this.$.message.text).split('_')[1]
                                        let lyricsId = this.mongoDBId.decode(sId)
    
                                        let isUpdated = await this.ly.updateOne({ _id: this.ObjectID(lyricsId) }, updateDoc)
                                        if (isUpdated) {

                                            this.$.sendMessage('✅ Uğurla günləşdi.')
                                            return
                                        }
                                        this.$.sendMessage('❗ Uğursuz Oldu.')
                                    })
                                }
                            },
                            {
                                text: "Xanəndəni",
                                callback: () => {
                                    this.$.runForm(SingerForm, async (result) => {

                                        const updateDoc = {
                                            $set: {
                                                singer: result.singer,
                                            },
                                        };

                                        let sId = (this.$.message.text).split('_')[1]
                                        let lyricsId = this.mongoDBId.decode(sId)
    
                                        let isUpdated = await this.ly.updateOne({ _id: this.ObjectID(lyricsId) }, updateDoc)
                                        if (isUpdated) {

                                            this.$.sendMessage('✅ Uğurla günləşdi.')
                                            return
                                        }
                                        this.$.sendMessage('❗ Uğursuz Oldu.')
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