const mysql = require('mysql')

const db = mysql.createConnection({
    user: 'root',
    password: 'bijikadal',
    database: 'latihan_upload_image',
    host: 'localhost'
})

module.exports = db