const express = require('express')
const app = express()
const chalk = require('chalk')
const Allroutes = require('./Routes/index.js')
const cors = require('cors')

// all middleware

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(Allroutes);


app.listen(process.env.PORT || 3000 , ()=>{
    console.log(chalk.bgCyanBright(`Server  Connected Port On http://localhost:${process.env.PORT}`));
})

