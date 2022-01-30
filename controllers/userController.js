import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import config from '../config.js';

const Users = userModel;

export const userLogout = (req, res) => {
    return res.status(200).clearCookie('jwt').json({ code: 200, message: "Successfully logged out 🍀" });
}

export const getUser = (req, res, next) => {
    Users.find({}).then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
        .catch((err) => next(err));

}

export const userSignup = async (req, res, next) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); //salt gen & hash the password.

        const user = {
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email,
            password: hashedPassword
        }; //store the hashed password


        Users.create(user).then((user) => {
            console.log(` ${user.username}'s account has been created successfully!`);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ code: 200, message: ` ${user.username}'s account has been created successfully!` })
        }, (err) => {
            console.log(err)
            res.status(400).json({ code: 400, message: 'Could not perform your operation' })
        })
            .catch((err) => res.status(400).json({ code: 400, message: 'There is an Error' }));



    } catch (error) {
        res.statusCode = 500;
        res.json({ code: 500, message: 'Looks like it\'s our problem, we\'ll solve it in no time' });

    }


}
export const findUser = (req, res, next) => {
    Users.findOne({ 'email': `${req.body.email}` }, function (err, user) {
        if (err) return res.status(400).json({ code: 400, message: 'There is an Error' });
        res.status(400).json({ code: 400, message: 'User with that email already exists' });
    });

    /* 
    next() */
}

//TODO: verifying user???

export const userLogin = async (req, res, next) => {
    //authenticate user

    Users.findOne({ 'email': `${req.body.email}` }, 'email password', function (err, user) {
        if (user === null) {
            return res.status(400).json({ code: 400, message: 'Cannot find user with that Email' })
        }

        /*  console.log('%s is a %s.', user.email,
             user.password); */
        //comparing the saved password with provided one

        try {
            if (bcrypt.compare(req.body.password, user.password)) {
                const userMail = { email: req.body.email };
                //sign the email
                const accessToken = jwt.sign(userMail, config.ACCESS_TOKEN_SECRET);
                res.setHeader('Content-Type', 'application/json');

                res.status(200).cookie('jwt', accessToken, {
                    maxAge: 1000 * 60 * 15, //after 15mini
                    sameSite: 'strict',
                    httpOnly: true
                });
                res.json({ code: 200, token: accessToken, message: 'You are successfully logged in!' });
            }
            else {
                res.status(400).json({ code: 400, message: 'Not allowed' });
            }
        }
        catch (error) {
            res.statusCode = 500;
            res.json({ code: 500, message: 'Looks like it\'s our problem, we\'ll solve it in no time' });
        }
    })

}

export const deleteUsers = (req, res, next) => {
    Users.remove({})
        .then((response) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ code: 200, message: "All Users deleted!" });
        }, (err) => res.status(400).json({ code: 400, message: 'Can not perform your operation' }))
        .catch((err) => res.status(400).json({ code: 400, message: 'There is an Error' }));
}
