import express from "express";
import mongoose from "mongoose";

import config from './config.js';


//connecting to mongo
//const url = config.mongoUrl;
const atlasUrl = config.mongoAtlas;

//const connection = mongoose.connect(atlasConnection);
const atlasConnection = mongoose.connect(atlasUrl,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
atlasConnection.then((db) => {
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

//app.use(cookieParser())
app.use(express.json());

//app.use(bodyParser.json());



//Simple logger
/* app.use('/api/v1/', function (req, res, next) {
    console.log(`==> Method: ${req.method} --Path: ${req.path} --IP: ${req.ip} --Code: ${res.statusCode}`);
    next();
});
 */
app.use('/api/v1/', indexRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/articles', articlesRouter);


//setup the port
var PORT = 5000;

app.listen(PORT, () =>
    console.log(`Node is listening on http://localhost:${PORT} ...`)
);