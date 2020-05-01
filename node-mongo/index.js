const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOps = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.info("conected correctly to server");
    const db = client.db(dbname);

    dbOps.insertDocument(db, { name: "Vadonut", description: "test" }, 'dishes', (result) => {
        console.info('Insert document \n', result.ops)
        dbOps.findDocuments(db, 'dishes', (docs) => {
            console.info('Found: \n', docs)
            dbOps.updateDocument(db, { name: 'Vadonut' }, { description: 'Updated test' }, 'dishes', (result) => {
                console.info("updated \n ", result.result)
                dbOps.findDocuments(db, 'dishes', (docs) => {
                    console.info('Found updated: \n', docs)
                    db.dropCollection('dishes', (result)=>{
                        console.info('Dropped colection: ', result)
                        client.close()
                    })
                }
                )
            })
        })
    })
})