const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');

const hbsHelpers = require('./utils/hbsHelpers');

// Read json on client's requests body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Read cookies on client's requests header
app.use(cookieParser());
app.use(morgan('tiny'));

app.engine('.hbs', hbs({
    layoutsDir: path.resolve(__dirname, 'views', 'layouts'),
    defaultLayout: 'main',
    partialsDir: path.resolve(__dirname, 'views', 'partials'),
    extname: '.hbs', 
    helpers: hbsHelpers
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


if (process.env.NODE_ENV == 'development') {
    app.disable('view cache');
} else {
    app.enable('view cache');
}

app.use(routes);

module.exports = app;

