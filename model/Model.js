class Model {

    constructor() {
        this.collection = new.target.name;
        return global.database.collection(this.collection);
    }

}


module.exports = Model