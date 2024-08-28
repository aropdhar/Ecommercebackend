const express = require('express')
const app = express()
const chalk = require('chalk')

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT || 3000 , ()=>{
    console.log(chalk.bgCyanBright(`Server  Connected Port On http://localhost:${process.env.PORT}`));
})

