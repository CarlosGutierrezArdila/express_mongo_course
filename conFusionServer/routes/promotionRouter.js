const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions')
const authenticate = require('../authenticate')

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

// endpoints to handle promotions and promotions/:promotionId

promotionRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promos) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(promos)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Promotions.create(req.body)
            .then((promo) => {
                console.info('promo created')
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => next(err))
    });

promotionRouter.route('/:promotionId')

    .get((req, res, next) => {
        Promotions.findById(req.params.promotionId)
            .then((promo) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promotionId);
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, { new: true })
            .then((promo) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promotionId)
            .then((resp) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, (err) => next(err))
            .catch((err) => next(err))
    });

module.exports = promotionRouter;