const express = require('express')
let cors = require('cors')
const dbHandler = require('./dbHandler.js')
const app = express()
app.use(cors())
const port = 3000

app.get('/planets', (req, res) => {
    function callback(results) {
        res.json(results)
    }
    dbHandler.getPlanets(callback)

})
app.get('/characters', (req, res) => {
    function imageCallBack(results,characters){
        res.json(results)
    }
    function callback(results) {
        dbHandler.getCharacterImages(results, imageCallBack)
    }

    dbHandler.getCharacters(callback)

})
app.get('/vehicles', (req, res) => {
    function callback(results) { res.json(results)}
    dbHandler.getVehicles(callback)
})

app.get('/factions',(req,res)=>{
  function callback(results) {res.json(results)}
    dbHandler.getFactions(callback)
})

app.listen(port, () => {
    console.log(`Jace API handler listening on port ${port}`)
})
