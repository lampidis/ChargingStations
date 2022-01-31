'use strict';

var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'chstations.mysql.database.azure.com',
    database: 'chstations',
    user: 'adminch',
    password: 'qwer1234!',
    //host: process.env.host,
    //user: process.env.user,
    //password: process.env.password,
    //database: process.env.database"
})

connection.connect((err) => {
    if (err)
        throw err;
});

// connection.query('SELECT * FROM ACCOUNT', function (err, rows) {
//     if (err) throw err
  
//     console.log('The solution is: ', rows[0])
//   })

 module.exports = connection;
//connection.end()