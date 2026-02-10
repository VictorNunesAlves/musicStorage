const multer = require("multer")
const path = require("path")

const musicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/musics");
    },
    filename:  (req, file, cb) => {
        cb(null, Date.now() +'-'+ String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    }
})

const musicUpload = multer({
    storage: musicStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(mp3|wav)$/)){
            return cb(new Error("Por favor envie somente arquivos .mp3 ou .wav"))
        }
        cb(undefined, true)
    }
})



module.exports = { musicUpload }