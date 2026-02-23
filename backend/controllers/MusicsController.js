const Musics = require('../models/Musics')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class MusicsController{
    
    static async create(req, res){
        //TODO: somente admin consege fazer isso, adicionar verificação de conta por token

        const { name, artist, album, letter, genre } = req.body
        let fileUrl = ""

        if(req.file){
            fileUrl = req.file.filename
        }

        if(!name){
            res.status(400).json({msg: 'Campo nome não pode ser nulo'})
            return
        }
        if(!artist){
            res.status(400).json({msg: 'Campo artista não pode ser nulo'})
            return
        }
        if(!genre){
            res.status(400).json({msg: 'Campo tipo não pode ser nulo'})
            return
        }
        if(fileUrl === ""){
            res.status(400).json({msg: 'Campo Musica não pode ser nulo'})
            return
        }

        const music = new Musics({
            name: name,
            album: album,
            genre: genre,
            letter: letter,
            artist: artist,
            fileUrl: fileUrl
        })

        console.log("music: "+ music)

        try {
            const newMusic = await music.save()
            res.status(201).json({msg: "Música asicionada com sucesso", newMusic})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error})
        }
    }

    static async update(req, res){
        //TODO: somente admin consege fazer isso, adicionar verificação de conta por token
        const { name, genre, artist, album, letter } = req.body
        let fileUrl = ''
        if(req.file){
            fileUrl = req.file.filename
        }

        if(!name){
            res.status(400).json({msg: 'Campo nome não pode ser nulo'})
            return
        }
        if(!artist){
            res.status(400).json({msg: 'Campo artista não pode ser nulo'})
            return
        }
        if(!genre){
            res.status(400).json({msg: 'Campo tipo não pode ser nulo'})
            return
        }
        if(fileUrl === ''){
            res.status(400).json({msg: 'Campo Musica não pode ser nulo'})
            return
        }

        const music = {
            name: name,
            album: album,
            genre: genre,
            letter: letter,
            artist: artist,
            fileUrl: fileUrl
        }

        await Musics.findOneAndUpdate(
            {_id: req.params.id},
            {$set: music},
            {new: true}
        )
        res.status(200).json({msg: "usuário atualizado com sucesso"})
    }

    static async delete(req, res){
        //TODO: somente admin consege fazer isso, adicionar verificação de conta por token
    }

    static async search(req, res){
        const musicReq = req.query.musicReq

        if(!musicReq){
            return res.status(400).json({msg: "Termo de Busca Vazio"})
        }

        try {

            const musics = await Musics.find({
                $or: [
                    {name: {$regex: musicReq, $options: 'i'}},
                    {artist: {$regex: musicReq, $options: 'i'}},
                    {album: {$regex: musicReq, $options: 'i'}},
                    {letter: {$regex: musicReq, $options: 'i'}}
                ]
            })
            res.status(200).json(musics)
        } catch (error) {
            res.status(500).json({msg: "Erro", error})
            console.log(error)
        }
        
    }
}