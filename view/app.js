///npm install express
///npm install --save-dev nodemon : server auto restart
///npm install morgan : logs
///npm install twilio
///npm install dotenv : set env variables
///npm install body parser

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
/*** Routes****/

const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contacts');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database connections
mongoose.connect('mongodb+srv://arjun1194:GeWyJl7N2Yp9qS8t@cluster0-vo3nn.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

});

//routes
app.use('/contacts', contactRoutes);
app.use('/users', userRoutes);

/*** handling errors***/
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