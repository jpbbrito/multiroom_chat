const express = require('express');
const expressValidator = require('express-validator');
const consign = require('consign');
const bodyParser = require('body-parser');
const app = express();

/* Setar engine de views e diretorio */
app.set('view engine', 'ejs');
app.set('views','./app/views');

/* Setar arquivos estaticos */

app.use(express.static('./app/public'));

/* Setar body-parser como middleware*/

app.use(bodyParser.urlencoded({extended:true}));

/* Setar express-validator */

app.use(expressValidator());

consign()
    .include('./app/routes')
    .then('./app/models')
    .then('./app/controllers')
    .into(app);

module.exports = app;
