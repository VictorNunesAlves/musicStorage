const mongoose = require('mongoose')
const {Schema} =  mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        playlists: [{
            name:{type: String, required: true, unique: true},
            description: {type: String},
            musics: [{type: mongoose.Types.ObjectId, ref: 'Musics'}]
        }]
    },
    {timestamp: true}
))

module.exports = User