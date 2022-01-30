import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from "cors";
import cookieParser from 'cookie-parser';

import config from './config.js';


//connecting to mongo
const url = config.mongoUrl;
//const atlasUrl = config.mongoAtlas;

//const connection = mongoose.connect(atlasConnection);
const connection = mongoose.connect(url);
//const atlasConnection = mongoose.connect(atlasUrl, { useNewUrlParser: true, useUnifiedTopology: true    })

connection.then((db) => {
    console.log('Connected correctly to MongoDB server! ');
}, (err) => {
    console.log('***** Not connected to MongoDB ***** server!');
    console.log(err.message);
});

//routes
import indexRouter from './routes/index.js';
import userRouter from "./routes/user.js";
import articlesRouter from "./routes/articles.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())
//Simple logger
/* app.use('/api/v1/', function (req, res, next) {
    console.log(`==> Method: ${req.method} --Path: ${req.path} --IP: ${req.ip} --Code: ${res.statusCode}`);
    next();
}); */

app.use('/api/v1/', indexRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/articles', articlesRouter);


//setup the port
const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Node is listening on http://localhost:${port} ...`)
);
