import articleModel from "../models/articles.js";

const Articles = articleModel;

export const getArticles = (req, res, next) => {
    /* res.json(articles.filter(article => article.user === req.user.email)) */
    Articles.find({})
        .then((articles) => {
            //res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ code: res.status, data: articles });
        }, (err) => res.status(400).json({ message: 'Can not perform your operation' }))
        .catch((err) => res.status(400).json({ message: 'There is an Error' }));
}

export const postArticle = (req, res, next) => {
    Articles.create(req.body)
        .then((article) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ code: res.status, message: 'Your post has been created!' })
        }, (err) => res.status(400).json({ message: 'Can not perform your operation' }))
        .catch((err) => res.status(400).json({ message: 'There is an Error' }));
}

export const deleteArticles = (req, res, next) => {
    Articles.remove({})
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response)
        }, (err) => res.status(400).json({ message: 'Can not perform your operation' }))
        .catch((err) => res.status(400).json({ message: 'There is an Error' }));
}

export const getArticle = (req, res, next) => {
    Articles.findById(req.params.articleId)
        .then((article) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(article)
        }, (err) => res.status(400).json({ error: 'No article' }))
        .catch((err) => res.status(400).json({ error: 'There is an Error' }));
}

export const editArticle = (req, res, next) => {
    Articles.findByIdAndUpdate(req.params.articleId, {
        $set: req.body
    }, { new: true })
        .then((article) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(article)
        }, (err) => res.status(400).json({ error: 'Can not perform your operation' }))
        .catch((err) => res.status(400).json({ error: 'There is an Error' }))
}

export const deleteArticle = (req, res, next) => {
    Articles.findByIdAndUpdate(req.params.articleId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => res.status(400).json({ error: 'Can not perform your operation' }))
        .catch((err) => res.status(400).json({ error: 'There is an Error' }));
}
