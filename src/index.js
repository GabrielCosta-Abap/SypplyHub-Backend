const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors())

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    
    next();
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(routes)

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})