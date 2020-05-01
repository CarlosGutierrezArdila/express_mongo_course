const express = require('express')
const http = require('http')
const morgan = require('morgan') // morgan to log info from requests
const bodyParser = require('body-parser') // to decode data from requests

const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promotionRouter');


const hostname = 'localhost'
const port = 3000

const app = express(); // app is going to use express
app.use(morgan('dev'))
app.use(bodyParser.json()) // to use bodyparser
// routes for dishes
app.use('/dishes', dishRouter)
app.use('/dishes/:dishId', dishRouter)
// routes for promos
app.use('/promotions', promotionRouter)
app.use('/promotions/:promotionId', promotionRouter)
// routes for leaders
app.use('/leaders', leaderRouter)
app.use('/leaders/:leaderId', leaderRouter)


app.use(express.static(__dirname + '/public')) // inform express to look into this folder to serve static files

app.use((req, res, next) => { // next is optional parameter to use aditional middleware
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><body><h1>This is an express server</h1></body></html>')
})

const server = http.createServer(app)

server.listen(port, hostname, () => {
    console.info(`Server runnig @ ${hostname}:${port}`)
})
