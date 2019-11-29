const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 8080;
const dbConfig = require('./database/db.config');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{useNewUrlParser: true}, (err) => {
  if(err) {
    console.log(err)
  } else {
  console.log('MongoDB Connected SUCCESSFULLY');
  }
});

const employeeRoute = require('./routes/employee.route');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());
app.use('/api', employeeRoute);

app.listen(port,() => {
  console.log('Connecting to port'+port);
});
