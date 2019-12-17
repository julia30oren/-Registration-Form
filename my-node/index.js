const express = require('express');
const bodyParser = require("body-parser");
require("dotenv").config()
const cors = require('cors')
const sessions = require("./sessions/sessions");
const validateSession = require("./routes/validateSession");
const logger = require("./utils/logger");
const app = express();

function ifEnvVarieblesExist(params) {
    const missingPar = params.filter(param => !process.env[param]);
    if (!missingPar.lenght) {
        console.log(`${missingPar} - missing`)
    } else return;
}
ifEnvVarieblesExist(["PORT", "SECRET"]);


app.use(cors());

app.use(bodyParser.json());
app.use(validateSession);

app.use(require('./routes/login'))
app.use(require('./routes/register'))
app.use(require('./routes/northwind'))
app.use(require('./routes/orders'))
app.use(require('./routes/users'))


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log('__error with PORT', err)
    } else {
        console.log("listening  to: " + process.env.PORT)
        logger.info(`server is listening to port: ${process.env.PORT}`)
    }
})