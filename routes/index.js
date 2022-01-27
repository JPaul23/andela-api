import { Router } from 'express';
var indexRouter = Router();

/* GET home page. */
//server the homepage
indexRouter.get('/', (req, res, next) => {
    res.send('Welcome to the Homepage');
});

export default indexRouter;