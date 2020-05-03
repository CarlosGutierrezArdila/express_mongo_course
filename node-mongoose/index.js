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

            return Dishes.findByIdAndUpdate(dish._id, {
                $set: { description: 'Updated test' },
            }, {
                new: true // this flag means the dish will be returned when updated
            }
            ).exec()
        }
        )
        .then((dish) => {
            console.info(dish)

            dish.comments.push({
                rating : 5,
                comment : 'I\'m getting a sinking felling!',
                author : 'Max777'
            })
            return dish.save()
        })
        .then((dish) => {
            console.info(dish)
            
            return Dishes.remove({})
        })

            
        
        .then(() => {
            return mongoose.connection.close()
        })
        .catch((err) => {
            console.info(err)
        })
})