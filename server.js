const path = require('path');
const express = require('express');
const exphs = require('express-handlebars')
const session = require('express-session');

const routes = require('./controllers')

const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: "shh",
    cookie: {},
    resave: false,
    saveUninitialized: true,

  };
  app.use(session(sess));

const hbs = exphs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
    console.log("Listening")

})