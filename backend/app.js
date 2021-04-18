const express = require('express');
const helmet = require("helmet");
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const saucesRoutes = require('./routes/sauces');
const bodyParser = require('body-parser');
const path = require('path');
//process.env.API_KEY
mongoose.connect(`mongodb+srv://${process.env.API_KEY}@cluster0.qaec7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
;

const app = express();

app.disable("x-powered-by");
app.use(helmet.hidePoweredBy());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.API_ORIGIN}`);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;