const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Favorites = require('../models/favorite')
const authenticate = require('../authenticate')
const cors = require('./cors')


const favoriteRouter = express.Router()

favoriteRouter.use(bodyParser.json())

const lookForDuplicates = (added, toAdd) => {
    let check = false
    toAdd.forEach(dish => { // check if the dish is already in the favorites, throw error on first duplicate
        if (added.indexOf(dish) !== -1) {
            check = true
        }
    })
    return check
}

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .populate('user')
            .populate('dishes')
            .then((favorite) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(favorite)
            }, (err) => next(err))
            .catch(err => {
                next(err)
            })

    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        const dishes = req.body.map((document) => document._id)
        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {
                if (favorite) {// if the fav document exists update
                    let added = favorite.dishes
                    if (lookForDuplicates(added, dishes) === true) {
                        err = new Error('The input contains dishes that are already marked as favorites')
                        err.status = 403;
                        return next(err)
                    } else {
                        let newDishes = added.concat(dishes)
                        Favorites.updateOne({ user: req.user._id }, {
                            $set: { dishes: newDishes }
                        })
                            .then((favorite) => {
                                res.statusCode = 200
                                res.setHeader('Content-Type', 'application/json')
                                res.json(favorite)
                            }, (err) => next(err))
                            .catch((err) => next(err))
                    }

                } else {// if not, create
                    Favorites.create({
                        user: req.user._id,
                        dishes: dishes
                    })
                        .then((favorite) => {
                            console.info('document created')
                            res.statusCode = 200
                            res.setHeader('Content-Type', 'application/json')
                            res.json(favorite)
                        }, (err) => next(err))
                }
            }, (err) => next(err))
            .catch(err => {
                next(err)
            })
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites/');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.deleteOne({ user: req.user._id })
            .then((resp) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => next(err))
    });

favoriteRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
        .then((facvorite) => {
            if (!favorite) {
                res.statusCode =200
                res.setHeader('Content-Type', 'application/json')
                return res.json({"exists": false, "favorites": favorite})
            } else {
                return res.json(
                    {"exists": (favorite.dishes.indexOf(req.params.dishId) > 0),
                     "favorites": favorite})
            }
        },(err) => next(err))
    })
    .catch((err) => next(err))

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        const dishes = [req.params.dishId]
        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {
                if (favorite) {// if the fav document exists update
                    let added = favorite.dishes
                    if (lookForDuplicates(added, dishes) === true) {
                        err = new Error('The dish is already marked as favorite')
                        err.status = 403;
                        return next(err)
                    } else {
                        let newDishes = added.concat(dishes)
                        Favorites.updateOne({ user: req.user._id }, {
                            $set: { dishes: newDishes }
                        })
                            .then((favorite) => {
                                res.statusCode = 200
                                res.setHeader('Content-Type', 'application/json')
                                res.json(favorite)
                            }, (err) => next(err))
                            .catch((err) => next(err))
                    }

                } else {// if not, create
                    Favorites.create({
                        user: req.user._id,
                        dishes: dishes
                    })
                        .then((favorite) => {
                            console.info('document created')
                            res.statusCode = 200
                            res.setHeader('Content-Type', 'application/json')
                            res.json(favorite)
                        }, (err) => next(err))
                }
            }, (err) => next(err))
            .catch(err => {
                next(err)
            })
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /favorites/');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favorite) => {
                favorite.dishes.splice(
                    favorite.dishes.indexOf(req.params.dishId), 1
                )
                favorite.save()
                    .then(favorite => {
                        res.statusCode = 200
                        res.setHeader('Content-Type', 'application/json')
                        res.json(favorite)
                    }, (err) => next(err))
            }, (err) => next(err))
            .catch((err) => next(err))
    });

module.exports = favoriteRouter