const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
app.use(cors());

const User = require("./models/users")
const userRoutes = require('./apis/users');
const contactRoutes = require('./apis/contacts');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database connections
mongoose.connect('mongodb+srv://impatiadr:' + process.env.MONGO_ATLAS_PW + '@node-testing-vnuif.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

//apis
app.use('/users', userRoutes);

app.all("*", (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            User.find({_id: decoded.userId})
                .exec()
                .then(user => {
                    req.body.user = user
                    next()
                })
                .catch((err) => res.status(401).send())
        } catch (e) {
            console.log(e)
            res.status(401).send()
        }
    } else {
        res.status(401).send()
    }


})

app.use('/contacts', contactRoutes);

/*** Error Handling***/
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    })
});

module.exports = app;