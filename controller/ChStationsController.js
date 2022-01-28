'use strict';

const { resolve } = require('path/posix');
const { nextTick } = require('process');
const url = require('url');

const model = require('../model/postgres/chstations_model.js');

exports.Home = function (req, res) {
    console.log("got into Home")
    res.status(200).json({reply : "Got into server!... try post request /map"})
}
exports.ChargingStationsInArea = function (req, res) {
    console.log("got into ChargingStationsInArea")
    req.on('data', function (data) {
        var location = {lat : data.toString().split('&')[0].split('=')[1], lon : data.toString().split('&')[1].split('=')[1]}
        var radious = data.toString().split('&')[2].split('=')[1]
        // var location = {lat : 38.25, lon : 21.74}
        // var radious = 0.01

        model.getChargersInArea(location, radious, (err, result) => {
            if (err) {
                console.log('error: ' + err)
                console.error('registration error: ' + err);
                //FIXME: δε θα έπρεπε να περνάμε το εσωτερικό σφάλμα στον χρήστη
                //res.render('login', { message: err });
            }
            else {
                console.log('get response ' + result)
                res.status(200).json({ chargingstations: result });
            }
        })
    })
}
exports.AvailableEvs = function (req, res) {
    console.log("got into AvailableEvs")

    model.getAvailableEvs((err, result) => {
        if (err) {
            console.log('error: ' + err)
            console.error('registration error: ' + err);
        }
        else {
            console.log('get response ' + result)
            res.status(200).json({ evs: result });
        }
    })
//})
}
exports.getUserInfo = function (req, res) {
    console.log("got into getUserInfo")
    var user_id = 1;
    model.getUserInfo(user_id, (err, result) => {
        if (err) {
            console.log('error: ' + err)
            console.error('registration error: ' + err);
        }
        else {
            console.log('get response ' + result)
            res.status(200).json({ evs: result });
        }
    })
}
exports.getCompanyInfo = function (req, res) {
    console.log("got into getCompanyInfo")
    var company_id = 1;
    model.getCompanyInfo(company_id, (err, result) => {
        if (err) {
            console.log('error: ' + err)
            console.error('registration error: ' + err);
        }
        else {
            console.log('get response ' + result)
            res.status(200).json({ evs: result });
        }
    })
}

exports.postComment = function (req, res) {
    console.log("got into postComment")
    req.on('data', function (data) {
        var comment = data.toString().split('&')[0].split('=')[1]
        var station_id = data.toString().split('&')[1].split('=')[1]
        var logged_user_id = 1 //req.session.loggedUserId
        model.addComment(comment, logged_user_id, station_id,(err, result) => {
            if (err) {
                console.log('error: ' + err)
                console.error('registration error: ' + err);
                //FIXME: δε θα έπρεπε να περνάμε το εσωτερικό σφάλμα στον χρήστη
                //res.render('login', { message: err });
            }
            else {
                console.log('get response ' + result)
                res.status(200).json({ commentStatus: result });
            }
        })
    })
}


exports.addCharger = function (req, res) {
    console.log("got into addCharger")
    let body = ''
    req.on('data', chunk=>{
        body = chunk.toString()
    })
    req.on('end', () => {
        console.log(body)
        var d = JSON.parse(body)

        var type = d.type
        var name = d.name
        var lat = d.lat
        var lon = d.lon
        var schedule = d.schedule
        var restrooms = d.restrooms
        var cost = d.cost
        var kW = d.kW
        var quantity = d.quantity

        var chStationId



        new Promise( (resolve, reject) =>{
            model.getChargingType(type, (err, result) => {
                if (err) {
                    console.error('getChargingType error: ' + err)
                    reject("error")
                    return
                }
                var hasChargingType = result
                console.log('typeof hasChargingType ' + typeof hasChargingType)
                if (typeof hasChargingType == 'undefined'){
                    console.log("adding ch type !!!")
                    model.addChargingType(type, (err, result) => {
                        if (err) {
                            console.error('addChargingType error: ' + err)
                            reject("error")
                            return
                        }
                        console.log('res add chType ' + result)
                    })}
                else console.log("already added type !!!")
                resolve();
            })
        }).then(function() {
            console.log("Starting 1st then() ... ")
            new Promise( (resolve, reject) => {
                model.getChargingStation(lat, lon, (err, result) => {
                if (err) {
                    console.error('getChargingStation error: ' + err)
                    reject("error")
                    return
                }
                var hasChargingStation = result
                console.log('typeof hasChargingStation ' + typeof hasChargingStation)
                if (typeof hasChargingStation == 'undefined'){
                    console.log("adding ch station...")
                    model.addChargingStation(name, lat, lon, schedule, restrooms, (err, result) => {
                        if (err) {
                            console.error('addChargingStation error: ' + err)
                            reject("error")
                            return
                        }
                        console.log('res add chStation ' + result)
                        resolve()
                    })}
                else resolve()
            })
        }).then(function() {
            console.log("Starting 2nd then() ... ")
            new Promise((resolve, reject) => {model.getChargingStation(lat, lon, (err, result) => {
                if (err) {
                    console.error('getChargingStation error: ' + err)
                    reject("error")
                    return
                }
                chStationId = result.station_id
                resolve(chStationId)
                })
            }).then(function() {
                console.log("Starting 3nd then() ... ")
                new Promise((resolve, reject) => {model.getCharger(type, chStationId, (err, result) => {
                    if (err) {
                        console.error('getCharger error: ' + err)
                        reject("error")
                        return
                    }
                    var hasCharger = result
                    console.log('typeof hasChargingStation ' + typeof hasCharger)
                    if (typeof hasCharger != 'undefined')
                        res.status(200).send("charger already in database with id: "+ hasCharger.charger_id)
                    else resolve(chStationId)
                    })
                }).then(function(chStationId) {
                    console.log("Starting 4rd then() ... ", chStationId)
                    model.addCharger(cost, kW, quantity, type, chStationId, (err, result) => {
                        if (err) {
                            console.error('addCharger error: ' + err)
                            return
                        }
                        console.log('res add Charger ' + result)
                        res.status(200).send("charger added")
                    })
                })
            })
        })
    })
        
        
    })
}
