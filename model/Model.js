class Model {

    collection = new.target.name;

    constructor() {
        return global.database.collection(this.collection);
    }

}


module.exports = Model