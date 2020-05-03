const mongoose = require('mongoose')
const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/conFusion'

const connect = mongoose.connect(url)

connect.then((db) => {
    console.info('Conneted to db')
    Dishes.create({
        name: 'Uthapizza',
        description: 'test'
    })
        .then((dish) => {
            console.info(dish)

            return Dishes.find({}).exec()
        }
        )
        .then((dishes) => {
            console.info(dishes)
            return Dishes.remove({})
        })
        .then(() => {
            return mongoose.connection.close()
        })
        .catch((err) => {
            console.info(err)
        })
})