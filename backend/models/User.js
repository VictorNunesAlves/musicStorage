const mongoose = require('mongoose')
const { STRING } = require ('sequelize')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        name: {type: STRING, required: true},
        email: {type: STRING, required: true},
        password: {type: STRING, required: true},
        playlists: [{
            name:{type: STRING, required: true, unique: true},
            description: {type: STRING},
            musics: [{type: mongoose.Types.ObjectId, ref: 'Musics'}]
        }]
    },
    {timestamp: true}
))

module.exports = User