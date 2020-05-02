const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOps = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
    console.info("conected correctly to server");
    const db = client.db(dbname);

    dbOps.insertDocument(db, { name: "Vadonut", description: "test" }, 'dishes')
        .then((result) => {
            console.info('Insert document \n', result.ops)
            return dbOps.findDocuments(db, 'dishes')
        })
        .then((docs) => {
            console.info('Found: \n', docs)
            return dbOps.updateDocument(db, { name: 'Vadonut' }, { description: 'Updated test' }, 'dishes')
        })
        .then((result) => {
            console.info("updated \n ", result.result)
            return dbOps.findDocuments(db, 'dishes')
        })
        .then((docs) => {
            console.info('Found updated: \n', docs)
            return db.dropCollection('dishes')
        })
        .then((result) => {
            console.info('Dropped colection: ', result)
            client.close()
        })
})
.catch(err => console.info(err))