const express = require ('express');
const routes = require('./routes/route5'); // import the routes
var bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/', routes); //to use the routes
const listener = app.listen(9995, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})