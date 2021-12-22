'use strict';
const sql = require('./db.heroku-pg.js');
const bcrypt = require('bcrypt')

//ψεύτικη καθυστέρηση που εξομοιώνει requests που αργούν να εξυπηρετηθούν
const fakeDelay = 500

//dummy, υπάρχει μόνο και μόνο για μοιάζει με το interface του mongo/mongoose model
exports.connect = (callback) => {
    callback(null, true)
}


// Log in and Register 
exports.registerUserNoPass = function (username, callback) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    exports.getUserByUsername(username, async (err, userId) => {
        if (userId != undefined) {
            callback(null, null, { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" })
        } else {
            try {
                const query = {
                    text: 'INSERT INTO public.user ( username, password) VALUES ( $1, $2) RETURNING id',
                    values: [username, ""],
                }
                sql.query(query, (err, result) => {
                    if (err)
                        setTimeout(callback, fakeDelay, err.stack, null);
                    else {
                        //το query επιστρέφει μια γραμμή με τα αποτελέσματα της εισαγωγής
                        //(αυτά που ζητήσαμε με το INSERT). Το "id" είναι το όνομα του πεδίου
                        //που αυξάνει αυτόματα. Η result.rows[0].id μας επιστρέφει την τιμή του.
                        setTimeout(callback, fakeDelay, null, result.rows[0].player_id)
                    }
                })
            } catch (err) {
                console.log(err)
                callback(err)
            }
        }
    })
}
exports.getUserByUsername = (username, callback) => {
    const query = {
        text: 'SELECT player_id, username, password FROM player WHERE username = $1 ORDER BY username LIMIT 1',
        values: [username],
    }
    sql.query(query, (err, user) => {
        if (err) {
            console.log(err.stack)
            callback(err.stack)
        }
        else {
            callback(null, user.rows[0])
        }
    })
}
exports.getUserById = (userId, callback) => {
    console.log("userId ", userId)
    const query = {
        text: 'SELECT player_id, username, password FROM player WHERE player_id = $1 ORDER BY player_id LIMIT 1',
        values: [userId],
    }
    sql.query(query, (err, user) => {
        if (err) {
            console.log(err.stack)
            callback(err.stack)
        }
        else {
            callback(null, user.rows[0])
        }
    })
}
exports.getUserByUsernamePassword = (username, password, callback) => {
    const query = {
        text: 'SELECT player_id, username, password FROM PLAYER WHERE username = $1 AND password = $2 ORDER BY username LIMIT 1',
        values: [username, password],
    }
    sql.query(query, (err, user) => {
        if (err) {
            console.log(err.stack)
            callback(err.stack)
        }
        else {
            callback(null, user.rows[0])
        }
    })
}
exports.registerUser = function (username, password, email, callback) {
    // ελέγχουμε αν υπάρχει χρήστης με αυτό το username
    exports.getUserByUsername(username, async (err, userId) => {
        if (userId != undefined) {
            callback(null, null, { message: "Υπάρχει ήδη χρήστης με αυτό το όνομα" })
        } else {
            try {
                //const hashedPassword = await bcrypt.hash(password, 10);

                const query = {
                    text: 'INSERT INTO player (username, password, email) VALUES ( $1, $2, $3) RETURNING player_id',
                    values: [username, password, email],
                }

                sql.query(query, (err, result) => {
                    if (err)
                        setTimeout(callback, fakeDelay, err.stack, null);
                    else {
                        //το query επιστρέφει μια γραμμή με τα αποτελέσματα της εισαγωγής
                        //(αυτά που ζητήσαμε με το INSERT). Το "id" είναι το όνομα του πεδίου
                        //που αυξάνει αυτόματα. Η result.rows[0].id μας επιστρέφει την τιμή του.
                        setTimeout(callback, fakeDelay, null, result.rows[0].player_id)
                    }
                })
            } catch (err) {
                console.log(err)
                callback(err)
            }
        }
    })
}


exports.getChargersInArea = (location,radious, callback) => {
    console.log(location)
    console.log(radious)
    const query = {
        text: "SELECT * FROM stations WHERE latitude < $1+$3 AND longitude < $2+$3"+
                "AND latitude > $1-$3 AND longitude > $2-$3",
        values: [location.lat, location.lon, radious],
    }
    sql.query(query, (err, result) => {
        if (err)
            callback(err.stack)
        else {
            callback(null, result.rows[0])
        }
    })
}




//Game 

exports.searchOpponent = (boardId, userId, callback) =>{
    console.log("boardId ", boardId)
    console.log("userId ", userId)
    const query = {
        text: "SELECT player_id1, player_id2 FROM participates WHERE board_id = $1",
        values: [boardId],
    }
    sql.query(query, (err, result) => {
        if (err)
            callback(err.stack)
        else {
            if(result.rows[0]){
                if(userId == result.rows[0].player_id1)
                    callback(null, result.rows[0].player_id2)
                else
                    callback(null, result.rows[0].player_id1)
            }
        }
    })
}
exports.searchMoveset = (callback) => {
    console.log('got into searchMoveset')
    sql.query("SELECT moveset FROM game", (err, result) => {
        if (err)
            callback(err.stack)
        else {
            console.log('q1', result.rows)
            console.log('q2', result.rows[0])
            console.log('q3', result.rows[0].moveset)
            callback(null, result.rows[0])
        }
    })
}
exports.createGame = (p1, callback) => {
    sql.query("INSERT INTO game (datetime, state) VALUES (CURRENT_TIMESTAMP, 'active') RETURNING board_id", (err, board) => {
        if (err)
            setTimeout(callback, fakeDelay, err.stack, null);
        else {
            const query = {
                text: "INSERT INTO participates (board_id, player_id1) VALUES ($1, $2) RETURNING board_id",
                values: [board.rows[0].board_id, p1],
            }
            sql.query(query, (err, result) => {
                if (err)
                    setTimeout(callback, fakeDelay, err.stack, null);
                else {
                    console.log('Created game board id ', result.rows[0].board_id)
                    setTimeout(callback, fakeDelay, null, result.rows[0].board_id)
                }
            })
        }
    })
}
exports.updateGame = (p2, p1, callback) => {
    const query = {
        text: "UPDATE participates SET player_id2 = $1 WHERE player_id1 = $2 AND player_id2 IS NULL RETURNING board_id",
        values: [p2, p1]
    }
    sql.query(query, (err, result) => {
        if (err)
            callback(err.stack)
        else
            callback(null, result.rows[0])
    })
}
exports.opponentMove = (board, lastPos, callback) => {
    console.log('got into opponentMove')
    const query = {
        text: "SELECT position FROM game WHERE board_id = $1",
        values: [board]
    }
    sql.query(query, (err, result) => {
        if (err)
            callback(err.stack)
        else {
            console.log(result.rows[0])
            if(result.rows[0].position == lastPos)
                callback(null, 0)
            else
                callback(null, result.rows[0].position)
        }
    })
}
