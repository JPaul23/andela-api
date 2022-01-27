import jwt from "jsonwebtoken";
import config from "../config.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] //getting the token
    if (token == null) {
        let err = new Error('You are not authenticated!');
        err.status = 401;
        return (err);
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            err.status = 403; //not valid token
            return next(err);
        }

        req.decoded = decoded;
        next();

    })

}

//verifying incoming user
export const verifyUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
        jwt.verify(token, config.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
                let err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        let err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

export const authorization = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        return next();
    } catch {
        return res.sendStatus(403);
    }
};
