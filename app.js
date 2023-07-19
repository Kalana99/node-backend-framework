const express = require('express');
const cors = require('cors');

// environmental variables
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const makeApp = () => {
    // express app
    const app = express();

    app.use(
        cors({
            exposedHeaders: ["x-refresh-token", "x-access-token"],
        })
    );
    app.use(express.json());

    // middleware & static files
    app.use(express.urlencoded({ extended: true }));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    // set static file path for production build
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
    }

    app.use((req, res, next) => {
        res.locals.path = req.path;
        next();
    });

    //root path
    app.get('/', (req, res) => {
        res.send("Welcome...!");
    });

    //routes
    app.use('/auth', authRoutes);

    return app;
}

module.exports = {
    makeApp
}
