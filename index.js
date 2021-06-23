const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const client = require('./device/client')

const app = express()

const dbURI = 'mongodb+srv://iotUser:iotMongo@cluster0.lgakf.mongodb.net/iot-system-db?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => { console.log("Connected to database") })
    .catch(console.log)

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/user', require('./routes/user'))
app.use('/device', require('./routes/device'))

app.listen(5000)