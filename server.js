const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mailer = require('./mailer.config');

const firebase = require('./firestore');
const firestore = firebase.firestore();

app.use(express.static(__dirname + '/angularapp'));
app.use(bodyParser.json());
app.use(cors())

app.listen(process.env.PORT || 8080);



app.post('/mailer', (req, res) => {
    console.log(req.body);
    mailer(req.body);
    res.status(200).send();
});

app.get('/patient/:id/activate', (req, res) => {
    const uid = req.params.id;
    firestore.collection('users')
    .doc(uid)
    .update("claims.isActiveUser", true)
    .then(
        ok => {
            res.send('Usuario activado');
        },
        err => {
            res.status(400).send(err);
        }
    );
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/angularapp/index.html'));
});

console.log('Build successful!!');
