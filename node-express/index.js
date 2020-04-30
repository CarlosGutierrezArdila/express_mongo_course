const express = require('express')
const http = require('http')
const morgan = require('morgan') // morgan to log info from requests
const bodyParser = require('body-parser') // to decode data from requests

const hostname = 'localhost'
const port = 3000

const app = express(); // app is going to use express
app.use(morgan('dev'))
app.use(bodyParser.json()) // to use bodyparser

app.all('/dishes', (req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    next() // executed and handle with functions before
})

// Support operations on /dishes

app.get('/dishes', (req, res, next) => {
    res.end('will send all dishes') // end response
})
app.post('/dishes', (req, res, next) => {
    res.end('will create: ' + req.body.name + " - " + req.body.description)
})
app.put('/dishes', (req, res, next) => {
    res.statusCode = 403
    res.end('PUT not supported')
})
app.delete('/dishes', (req, res, next) => {
    res.end('will delete all dishes')
})

// Support operations on /dishes:dishId

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('will send dish:'+req.params.dishId) // end response
})
app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403
    res.end('POST not supported')
})
app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating \n')
    res.end('Will update dish: ' +req.params.dishId)
})
app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Will delete dish: ' +req.params.dishId)
})

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
