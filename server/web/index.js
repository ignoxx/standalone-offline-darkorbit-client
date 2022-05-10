const express = require("express");
const web = express();

// web.use(cors())
web.use(express.static(__dirname + '/public'));


web.get('/', (req, res) => {
    res.sendFile("index.html")
})

web.get('/getflashres.es', (req, res) => {
    res.sendFile("getflashres.xml", { root: __dirname + "/public" })
})

web.get('/gameserver.es', (req, res) => {
    res.sendFile("getserverres.xml", { root: __dirname + "/public" })
})

module.exports = web;