import express from "express";

import { verifyToken, verifyUser } from "../Middleware/authentication.js";
import {
    deleteArticle,
    deleteArticles,
    editArticle,
    getArticle,
    getArticles,
    postArticle
} from "../controllers/articleController.js";

const articlesRouter = express.Router();
articlesRouter.use(express.json());

articlesRouter.route('/')
    .all((req, res, next) => {
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get(verifyUser, getArticles)
    .post(verifyUser, postArticle)

    .put(verifyUser, (req, res, next) => {
        res.statusCode = 403; //not supported
        res.end('PUT operation not supported on /articles');
    })

    .delete(verifyUser, deleteArticles);

//article id

articlesRouter.route('/:articleId')
    .get(verifyUser, getArticle)
    .post(verifyUser, (req, res, next) => {
        res.statusCode = 403; //not supported
        res.end('PUT operation not supported on /api.articles/' + req.params.articleId);
    })
    .put(verifyUser, editArticle)

    .delete(verifyUser, deleteArticle);

export default articlesRouter;

