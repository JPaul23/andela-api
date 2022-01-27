import express from "express";

import { verifyToken, verifyUser } from "../Middleware/authentication.js";
import feedbackModel from "../models/feedback.js";

const feedbackRouter = express.Router();
feedbackRouter.use(express.json());

const Feedbacks = feedbackModel;

feedbackRouter.route('/')
    .all((req, res, next) => {
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        /* res.json(Feedback.filter(article => article.user === req.user.email)) */
        Feedbacks.find({})
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(verifyUser, (req, res, next) => {
        Feedbacks.create(req.body)
            .then((feedback) => {
                console.log('Feedback Created ', feedback);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(article)
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put(verifyUser, (req, res, next) => {
        res.statusCode = 403; //not supported
        res.end('PUT operation not supported on /Feedback');
    })

    .delete(verifyUser, (req, res, next) => {
        Feedbacks.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response)
            }, (err) => next(err))
            .catch((err) => next(err));
    });

export default feedbackRouter;

