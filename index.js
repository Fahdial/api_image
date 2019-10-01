var express = require('express')
var app = express()
const port = 8082
var cors = require('cors')
var bodyParser = require('body-parser')
var multer = require('multer')
const db = require('./database')

app.use(bodyParser.json())
app.use(cors())
app.use('/files', express.static('uploads')) //method untuk get foto dari folder uploads (static)


let multerStorageConfig = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        // cb(null, 'fotoku.jpg')
        cb(null, `PRD=-${Date.now()}.${file.mimetype.split('/') [1]}`)
    }
})

let filterConfig = (req, file, cb) => {
    if (file.mimetype.split('/') [1] == 'png' || file.mimetype.split('/') [1] == 'jpeg') {
        cb(null, true)   
    }else{
        req.validation = {error : true, msg : 'File must be an image'}
        cb(null, false)
    }
}

let upload = multer({
    storage: multerStorageConfig,
    filterFilter: filterConfig
})

app.post('/uploadimage', upload.single('aneh'), (req,res) => {
    let sql = `insert into upload_image values (0, '${req.body.name}', '${req.file.path}')`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.send('result')
        console.log(req)
    })
    })

app.listen(port, console.log('listening in port ' + port))

// mimetype split