require('dotenv').config()
var express = require("express");
var bodyParser = require('body-parser');
var reload = require('reload');
var app = express();
const router=require('./routers/routes')
const flash = require('connect-flash');
var session = require('express-session');
const cors = require('cors')



// *******************************************************************************
// var multer = require('multer');
// var upload = multer();

// app.use(upload.array()); 
// app.use(express.static('public'));
// **************************************************************************************



const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({
    // origin:'*'
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(flash());
// app.use(flash());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(router);
/* route to handle login and registration */


var port = process.env.PORT || 4000
reload(app).then(() => {
    app.listen(port, function () {
        console.log('Web server listening on port ' + 4000)
    })
}).catch(function (err) {
    console.error('Reload could not start, could not start server/sample app', err)
})


module.exports = app
// module.exports = server