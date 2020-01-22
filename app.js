const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('we are on home');
});

mongoose.connect(
    'mongodb+srv://test:test1@cluster0-gj2cl.mongodb.net/test?retryWrites=true&w=majority', 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    () => {console.log('Conectado ao servidor no MongoDB!')}
);


app.listen(3000);
