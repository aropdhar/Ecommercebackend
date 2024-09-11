require('dotenv').config()
const {app} = require('./App.js');

const {Dbconnection} = require('./Dbconfiguration/Dbconfiguration.js')

// connection database

Dbconnection()
