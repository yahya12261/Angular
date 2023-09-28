const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const mongoose = require('mongoose');
const app = require('./app');
var cors = require("cors");

app.use(cors());

app.options("*", cors());

const corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
mongoose.connect('mongodb://127.0.0.1:27017/eCommerce', { useNewUrlParser: true, useUnifiedTopology: true })
.then((conn) => {
    // console.log(conn);
    console.log('DB Connection Successful');
})
.catch((err)=>{console.log(err)})
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception occured! Shutting down...');
    process.exit(1);
 })

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('server has started...');
})
