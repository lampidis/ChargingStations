'use strict';

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'chargingstations.mysql.database.azure.com',
    user: 'adminch',
    password: 'qwer1234!',
    database: 'chargingstations'
    //host: process.env.host,
    //user: process.env.user,
    //password: process.env.password,
    //database: process.env.database"
})

connection.connect((err) => {
    if (err)
        throw err;
});

connection.query('SELECT * FROM ACCOUNT', function (err, rows) {
    if (err) throw err
  
    console.log('The solution is: ', rows[0])
  })

//module.exports = client
connection.end()