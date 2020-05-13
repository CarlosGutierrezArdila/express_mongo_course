const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Favorites = require('../models/favorite')
const authenticate = require('../authenticate')
const cors = require('./cors')


const favoriteRouter = express.Router()

favoriteRouter.use(bodyParser.json())

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    

})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // if the fav document exists
    Favorites.find({user : req.user._id})
    .then()
})
.put(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {

})
.delete(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {

});

leaderRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, (req, res, next) => {

})

.post(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {

})

.put(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {

})

.delete(cors.corsWithOptions, authenticate.verifyUser,  (req, res, next) => {

});