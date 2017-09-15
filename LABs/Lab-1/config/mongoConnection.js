const MongoClient = require("mongodb").MongoClient;

const settings = {
    mongoConfig: {
        serverUrl: "mongodb://127.0.0.1:27017/",
        database: "Sutariya-Ruchika-CS554-Lab1"
    }
};

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined

let connectDb = () => {
    if (!_connection) {
        _connection = MongoClient.connect(fullMongoUrl)
            .then((db) => {
                return db;
            });
    }
    return _connection;
};

module.exports = connectDb;

