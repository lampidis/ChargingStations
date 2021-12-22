'use strict';

const { nextTick } = require('process');
const url = require('url');

const model = require('../model/postgres/chess-model-heroku-pg.js');


exports.ChargingStationsInArea = function (req, res) {
    req.on('data', function (data) {
    var location = data.toString().split('&')[0].split('=')[1]
    var radious = data.toString().split('&')[1].split('=')[1]

    model.getChargersInArea(location,radious, (err, result) => {
        if (err) {
            console.error('registration error: ' + err);
            //FIXME: δε θα έπρεπε να περνάμε το εσωτερικό σφάλμα στον χρήστη
            //res.render('login', { message: err });
        }
        else {
            res.status(200).json({ chargingstations: result });
        }
    })
})
}


exports.makeMove = (req,res) => {
    console.log("player id ",req.session.loggedUserId, " makeMove")
    let body = ''
    //saving post data into variable body
    req.on('data', chunk=>{
        body += chunk.toString()
    })
    req.on('end', () => {
        var postData = JSON.parse(body)
        console.log('postData', postData)
        model.makeMove(req.session.board_id, postData.curPos, postData.lastMove, (err, col) => {
            if (err) {
                console.log(err.message);
            }
            else {
                req.session.lastPosition = postData.curPos
                req.session.save(function(err) {
                    // session saved
                  })
                res.status(200).json({ status: "success" });
            }
        });
    })
}
exports.getInfo = (req, res) => {
    console.log("getInfo")
    if(req.session.board_id){
        model.getInfo(req.session.board_id, req.session.loggedUserId, (err, col) => {
            if (err) {
                console.log(err.message);
            }
            else {
                res.status(200).json({ board_id: req.session.board_id, colour: col });
            }
        });
    }
}
// exports.opponentMove = (req, res) => {
//     console.log("opponentMove")
//     if(req.session.board_id){
//         model.opponentMove(req.session.board_id, req.session.lastPosition, (err, position) => {
//             if (err) {
//                 console.log(err.message);
//             }
//             else {
//                 res.status(200).json({ newPos: position });
//             }
//         });
//     }
// }
exports.searchGame = (req, res) => {
    console.log("lobby")
    model.searchWaitingPlayer((err, waitingPlayer) => {
        if (err){
            console.log(err.message);
        }else if(waitingPlayer){
                var chall_id = waitingPlayer.player_id1
                console.log("waiting player found -> player id ", chall_id)

                model.updateGame(req.session.loggedUserId, chall_id, (err, response) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if(response){
                            console.log('response id', response.board_id)
                            req.session.board_id = response.board_id
                            req.session.save(function(err) {
                                // session saved
                              })
                    }
                        else
                        console.log('response is ', response)
                    }
                })
        }
        else{
            model.createGame(req.session.loggedUserId, (err, board) => {
                if (err){
                    console.log(err);
                } else
                req.session.board_id = board
                console.log("Game created -> board id ", board)
                req.session.save(function(err) {
                    // session saved
                  })
            })
        }
        
    });
}
exports.findUserNames = (req, res) => {
    model.searchOpponent(req.session.board_id, req.session.loggedUserId, (err, opponent_id) => {
        if (err) {
            console.log(err)
        }
        else {
            let chall_id = opponent_id
            model.getUserById(req.session.loggedUserId, (err, loguser) => {
                if (err) {
                    console.log(err)
                }
                else {
                    req.session.playername = loguser.username
                    req.session.opponent_id = chall_id
                    model.getUserById(chall_id, (err, user) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            if(user){
                                req.session.opponentname  = user.username
                                console.log("playername ", req.session.playername)
                                console.log("opponentname ", req.session.opponentname)
                                res.status(200).json({ playername: req.session.playername, opponentname: req.session.opponentname });
                            }
                            else
                                res.status(200).json({ playername: false, opponentname: false });
                        }
                    })
                }
            })
        }
    })
}
exports.checkIfFinifhed = (req, res, next) => {
    console.log("checkIfFinifhed")
        model.checkIfFinifhed(req.session.board_id, (err, response) => {
            if (err) {
                console.log(err.message);
            }
            else if (response.state == 'active') next();
            else if (response.state == req.session.opponent_id.toString())
                res.status(200).json({newPos: 'lost'});
            else{
                res.status(200).json({newPos: response.state});
            }
        });
}


exports.checkmate = (req, res) => {
    console.log("checkmate")
        model.checkmate(req.session.board_id, req.session.loggedUserId, (err, response) => {
            if (err) {
                console.log(err.message);
            }
            else {
                res.status(200).json({res: response});
            }
        });
}
exports.draw = (req, res) => {
    console.log("draw")
        model.draw(req.session.board_id, (err, response) => {
            if (err) {
                console.log(err.message);
            }
            else {
                res.status(200).json({res: response});
            }
        });
}

exports.opponentMove = (req, res) => {
    console.log("opponentMove")
    
    if(req.session.board_id){
        model.opponentMove(req.session.board_id, req.session.lastPosition, (err, position) => {
            if (err) {
                console.log(err.message);
            }
            else {
                model.checkIfFinifhed(req.session.board_id, (err, response) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else{
                        let gstatus = response.state
                        if (response.state == req.session.opponent_id.toString()) gstatus='lost'
                        if (response.state == req.session.loggedUserId.toString()) gstatus='win'
                        res.status(200).json({ newPos: position , gameStatus: gstatus});
                    }
                });
            }
        });
    }
}