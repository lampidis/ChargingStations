'use strict';
const sql = require('./db_mysql.js');
const fakeDelay = 500

exports.connect = (callback) => {
    callback(null, true)
}


// Log in and Register 
exports.getUserByUsernameMail = (username, mail, callback) => {
    const query = 'SELECT user_id, username, password FROM account WHERE username = ? OR mail = ? ORDER BY username LIMIT 1'
    const values = [username, mail]
    sql.query(query, values, (err, user) => {
        if (err) {
            console.log(err.stack)
            callback(err.stack)
        }
        else {
            callback(null, user[0])
        }
    })
}
exports.getUserByUsernamePassword = (username, password, callback) => {

    const query = 'SELECT user_id, username, password FROM ACCOUNT WHERE username = ? AND password = ?'
    const values = [username, password]
    sql.query(query, values, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else {
            setTimeout(callback, fakeDelay, null, result[0])
        }
    })
}
exports.registerUser = function (username, password, email, callback) {
    exports.getUserByUsernameMail(username, email, async (err, userId) => {
        console.log("userId: ", userId)
        if (userId != undefined) {
            callback(null, { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα ή email" })
        } else {
            try {
                var query = 'INSERT INTO account (username, password, mail, account_type) VALUES (?,?,?,?)'
                var values = [username, password, email, "basic"]
                sql.query(query, values, (err, result) => {
                    if (err)
                        setTimeout(callback, fakeDelay, err.stack, null);
                    else
                        setTimeout(callback, fakeDelay, null, result.insertId)
                })
            } catch (err) {
                console.log(err)
                callback(err)
            }
        }
    })
}


// Charging Stations 
exports.getChargingStationsInArea = function (location, radious, callback) {
    var query = 'SELECT charging_station.station_id,name,latitude,longitude,schedule,nearby_restrooms,SUM(quantity) AS total, SUM(available) AS av FROM charging_station LEFT JOIN charger ON  charging_station.station_id = charger.station_id WHERE longitude>? AND longitude <? AND latitude>? AND latitude <? GROUP BY charging_station.station_id'
    var values = [location.lon - radious, location.lon + radious,
    location.lat - radious, location.lat + radious]

    sql.query(query, values, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else {
            setTimeout(callback, fakeDelay, null, result)
        }
    })
}

exports.getChargingStationInfo = function (chstation_id, callback) {
    var query = 'SELECT * FROM charging_station WHERE station_id=?'
    var values = chstation_id

    sql.query(query, values, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else {
            setTimeout(callback, fakeDelay, null, result)
        }
    })
}
exports.getChargerInfo = function (chstation_id, callback) {
    var query = 'SELECT charger_id,status,cost,kW,quantity,available,type FROM charger WHERE station_id=?'
    var values = chstation_id

    sql.query(query, values, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else {
            setTimeout(callback, fakeDelay, null, result)
        }
    })
}




exports.getUserInfo = (user_id, callback) => {
    console.log('user_id: ' + user_id)
    const query = "SELECT username, mail, password, account_type FROM ACCOUNT WHERE USER_ID = ?"
    const values = [user_id]
    sql.query(query, values, (err, result) => {
        if (err)
            callback(err.stack)
        else {
            callback(null, result)
        }
    })
}
exports.getCompanyInfo = (company_id, callback) => {
    console.log('company_id: ' + company_id)
    const query = "SELECT * FROM COMPANY WHERE COMPANY_ID = ?"
    const values = [company_id]
    sql.query(query, values, (err, result) => {
        if (err)
            callback(err.stack)
        else {
            callback(null, result)
        }
    })
}
exports.getAvailableEvs = (callback) => {
    const query = "SELECT * FROM EV"
    sql.query(query, (err, result) => {
        if (err)
            callback(err.stack)
        else {
            callback(null, result)
        }
    })
}


exports.addComment = function (comment, userId, stationId, callback) {
    var query = 'INSERT INTO comment (user_id, station_id, comment) VALUES (?,?,?)'
    var values = [userId, stationId, comment]

    sql.query(query, values, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else
            setTimeout(callback, fakeDelay, null, "comment sent")
    })
}
exports.addReview = function (review, userId, stationId, callback) {
    var query = 'INSERT INTO review (user_id, station_id, review) VALUES (?,?,?)'
    var values = [userId, stationId, review]

    sql.query(query, values, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else
            setTimeout(callback, fakeDelay, null, "review sent")
    })
}
exports.addCheckIn = function (userId, stationId, callback) {
    var query = 'INSERT INTO Check_in (user_id, station_id) VALUES (?,?)'
    var values = [userId, stationId]

    sql.query(query, values, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else
            setTimeout(callback, fakeDelay, null, "Check_in sent")
    })
}
exports.addFavoriteStation = function (userId, stationId, callback) {
    var query = 'INSERT INTO Fav_station (user_id, station_id) VALUES (?,?)'
    var values = [userId, stationId]

    sql.query(query, values, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else
            setTimeout(callback, fakeDelay, null, "Fav_station sent")
    })
}
exports.addFavoriteCompany = function (userId, companyId, callback) {
    var query = 'INSERT INTO Fav_Company (user_id, company_id) VALUES (?,?)'
    var values = [userId, companyId]

    sql.query(query, values, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else
            setTimeout(callback, fakeDelay, null, "Check_in sent")
    })
}



exports.getChargingType = function (type, callback) {
    //sql.query('SELECT * FROM CHARGING_TYPE', (err, result)=>{
    sql.query('SELECT * FROM CHARGING_TYPE WHERE type = ?', type, (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else {
            console.log("type result: ", result[0])
            setTimeout(callback, fakeDelay, null, result[0])
        }
    })
}
exports.getChargingStation = function (lat, lon, callback) {
    sql.query('SELECT station_id FROM CHARGING_STATION WHERE latitude = ? AND longitude = ?', [lat, lon], (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else {
            console.log("station result: ", result[0])
            setTimeout(callback, fakeDelay, null, result[0])
        }
    })
}
exports.getCharger = function (type, st_id, callback) {
    sql.query('SELECT * FROM CHARGER WHERE type = ? AND station_id = ?', [type, st_id], (err, result) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null)
        else {
            console.log("station result: ", result[0])
            setTimeout(callback, fakeDelay, null, result[0])
        }
    })
}
// exports.getChargersStatus = function(st_id, callback) {
//     sql.query('SELECT type, quantity, available FROM CHARGER WHERE station_id = ?', st_id, (err, result)=>{
//         if (err)
//             setTimeout(callback, fakeDelay, err.stack, null)
//         else {
//             console.log("station result: ", result)
//             setTimeout(callback, fakeDelay, null, result)
//         }
//     })
// }
exports.addChargingType = function (type, callback) {
    var query = 'INSERT INTO CHARGING_TYPE (`type`) VALUES (?)'
    var values = [type]
    sql.query(query, values, (err, result) => {
        if (err) {
            console.log('charging_type error')
            setTimeout(callback, fakeDelay, err.stack, null);
        }
        else {
            console.log("charging type added: ", result[0])
        }
    })
}
exports.addChargingStation = function (name, lat, lon, schedule, restrooms, callback) {
    var query = 'INSERT INTO CHARGING_STATION (`name`,`latitude`, `longitude`,`schedule`,`nearby_restrooms`) VALUES (?,?,?,?,?'
    var values = [name, lat, lon, schedule, restrooms]
    sql.query(query, values, (err, result) => {
        if (err) {
            console.log('charging_station error')
            setTimeout(callback, fakeDelay, err.stack, null);
        }
        else {
            console.log("charging station added: ", result[0])
            setTimeout(callback, fakeDelay, null, "done");
        }
    })
}
exports.addCharger = function (cost, kW, quantity, available, type, st_id, callback) {
    var query = 'INSERT INTO CHARGER (`status`,`cost`, `kW`, `quantity`, `available`, `type`, `station_id`) VALUES (?,?,?,?,?,?,?)'
    var values = ["free", cost, kW, quantity, available, type, st_id]
    sql.query(query, values, (err, result) => {
        if (err) {
            console.log('charger error')
            setTimeout(callback, fakeDelay, err.stack, null);
        }
        else {
            setTimeout(callback, fakeDelay, null, "charger added: ", result[0])
        }
    })
}




exports.getRandUser = (callback) => {
    const query = "SELECT ACCOUNT.user_id, ACCOUNT.username , EV.type, EV.car_company, EV.model FROM ACCOUNT INNER JOIN Posses ON ACCOUNT.user_id = Posses.user_id INNER JOIN EV ON Posses.car_id = EV.car_id"
    sql.query(query, (err, result) => {
        if (err)
            callback(err.stack)
        else {
            callback(null, result)
        }
    })
}
exports.useAvailable = (ch_id, av, callback) => {
    var stat = 'in use'
    if (av == 0) stat = 'full'
    const query = "UPDATE charger SET status = ?, available = ? WHERE charger_id = ?"
    var values = [stat, av, ch_id]
    sql.query(query, values, (err, result) => {
        if (err)
            callback(err.stack)
        else {
            callback(null, result)
        }
    })
}
exports.freeAvailable = (ch_id, av, q, callback) => {
    var stat = 'in use'
    if (av == q) stat = 'free'
    const query = "UPDATE charger SET status = ?, available = ? WHERE charger_id = ?"
    var values = [stat, av, ch_id]
    sql.query(query, values, (err, result) => {
        if (err)
            callback(err.stack)
        else {
            callback(null, result)
        }
    })
}
