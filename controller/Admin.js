
class Admin {

    constructor($, ly) {
        this.isAdmin = true
        this.ly = ly
        this.$ = $
    }

    editLyrics() {
        if (this.isAdmin) {
            this.$.runInlineMenu({
                layout: 2,
                method: 'sendMessage', 
                params: ['text'], 
                menu: [
                    {
                        text: 'Yenilə',
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

                                        this.$.sendMessage('yep')
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
                                callback: () => {

                                    this.$.sendMessage('yep')

                                }
                            },
                            {
                                text: 'Yox',
                                callback: () => {

                                    this.$.sendMessage('yep')
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