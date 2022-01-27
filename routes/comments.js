import express from "express";

import config from "../config.js";
import { verifyToken, verifyUser } from "../Middleware/authentication.js";
import commentModel from "../models/comments.js";

const commentRouter = express.Router();
commentRouter.use(express.json());

const Comments = commentModel;

commentRouter.route('/')
    .all((req, res, next) => {
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        /* res.json(Comments.filter(comment => comment.user === req.user.email)) */
        Comments.find({})
            .then((Comments) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Comments);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(verifyUser, (req, res, next) => {
        Comments.create(req.body)
            .then((comment) => {
                console.log('comment Created ', comment);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment)
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put(verifyUser, (req, res, next) => {
        res.statusCode = 403; //not supported
        res.end('PUT operation not supported on /Comments');
    })

    .delete(verifyUser, (req, res, next) => {
        Comments.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response)
            }, (err) => next(err))
            .catch((err) => next(err));
    });

export default commentRouter;

