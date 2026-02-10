const express = require('express')
const MusicsController = require('../controllers/MusicsController')
const router = express.Router()
const { musicUpload } = require("../helpers/music-storage")

router.post("/create", musicUpload.single('music'), MusicsController.create)
router.patch("/edit/:id", musicUpload.single('music'),MusicsController.update)
router.get("/search", MusicsController.search)

module.exports = router