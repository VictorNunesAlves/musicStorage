const express = require ("express")
const cors = require ("cors")
require('./db/conn')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    credentials: true,
    origin:"http://localhost:3000"
}))

app.use(express.static('public'))

const UserRoutes = require('./routes/UserRoutes')
const MusicsRoutes = require('./routes/MusicsRoutes')

app.use('/musics', MusicsRoutes)
app.use('/user', UserRoutes )

app.listen(5000, () => {
    console.log('servidor rodando em http://localhost:5000')

})