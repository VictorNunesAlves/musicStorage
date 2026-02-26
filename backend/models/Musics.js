const mongoose = require ('mongoose');
const { Schema } = mongoose;

const Musics = mongoose.model(
    'Musics',
    new Schema(
        {
            name: {type: String, required: true},
            artist: {type: String, required:true},
            album: {type: String},
            letter: {type: String},
            genre: {type: String, required: true},
            fileUrl: {type: String, required: true}
        },
        {timestamps:  true}
    )
)

module.exports = Musics