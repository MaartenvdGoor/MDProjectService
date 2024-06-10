var mysql = require("mysql");
const {json} = require("express");

var hostname = "8sm.h.filess.io";
var database = "JayceDB_president";
var port = "3305";
var username = "JayceDB_president";
var password = "474f50ba12f1668466b858a860b448ee67153c9f";

var con = mysql.createConnection({
    host: hostname,
    user: username,
    password,
    database,
    port,
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
exports.getPlanets = function (callback) {
    con.query("SELECT * FROM planet", function (err, results, fields) {
        if (err) throw err;
        callback(JSON.parse(JSON.stringify(results)))
    });
}

exports.getCharacters = function (callback) {
    con.query(
        "SELECT `character`.*," +
        "planet.name as planet," +
        "vehicle.name as vName " +
        "FROM `character`" +
        "INNER JOIN vehicle on `character`.vehicle_id = vehicle.vehicle_id " +
        "INNER JOIN planet on `character`.planet_id = planet.planet_id",
         async function (err, results, fields) {
            if (err) throw err;
            let jsonResults = JSON.parse(JSON.stringify(results))
            callback(jsonResults)
        }
    )
}

exports.getFactions = function (callback){
    con.query(
        "SELECT DISTINCT `character`.faction from `character`",
        function (err,results,fields){
            if (err) throw err;
            callback(JSON.parse(JSON.stringify(results)))
        }
    )
}


exports.getVehicles = function (callback) {
    con.query(
        "SELECT vehicle.*, " +
        "`character`.name as cName, " +
        "`character`.faction as faction " +
        "FROM vehicle " +
        "INNER JOIN `character` on vehicle.vehicle_id = `character`.vehicle_id " +
        "GROUP BY vehicle.vehicle_id",
        function (err, results, fields) {
            if (err) throw err;
            callback(JSON.parse(JSON.stringify(results)))
        }
    )
}

exports.getCharacterImages = function (characters,callback) {
    let jsonResults = [];
    for (let i = 0; i < characters.length; i++) {
        con.query("SELECT image_url FROM character_images WHERE character_id = " + characters[i].character_id,
            function (err, results, fields) {
                if (err) throw err;
                let jsonResults = JSON.parse(JSON.stringify(results))
                let imageArray = []
                jsonResults.forEach((value) => {
                    imageArray.push(value.image_url)
                })
                characters[i].images = imageArray
                if (i + 1 >= characters.length){test()}
            }
        )
    }
    function test(){
        callback(characters)
    }

}
