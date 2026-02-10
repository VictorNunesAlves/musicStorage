const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://localhost:27017/Spotify')
    console.log('Conectou ao db')
}


main().catch(err => console.log(err));
console.log('MongoDB State:'+ mongoose.connection.readyState)

module.exports = mongoose