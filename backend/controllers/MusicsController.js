const Musics = require('../models/Musics')
const ObjectId = require('mongoose').Types.ObjectId
const path = require ('path')

module.exports = class MusicsController{
    
    static async create(req, res){
        //TODO: somente admin consege fazer isso, adicionar verificação de conta por token
        const { name, artist, album, letter, genre } = req.body
        let fileUrl = ""

        if(!req.file){
            return res.status(422).json({msg: "Precisa enviar o arquivo de música"})
        }
        
        fileUrl = req.file.filename
        
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
            res.status(201).json({msg: "Música adicionada com sucesso", newMusic})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error})
            return
        }
    }

    static async update(req, res){
        //TODO: somente admin consege fazer isso, adicionar verificação de conta por token
        const { name, genre, artist, album, letter } = req.body
        const { id } = req.params
        let fileUrl = ''
        const music = {}

        if(!ObjectId.isValid(id)){
            return res.status(422).json({msg: "ID inválido"})
        }

        const musicToAlterate = await Musics.findById({id})
        if(!musicToAlterate){
            res.status(400).json({msg: "Música não encontrada"})
            return
        }

        if(req.file){
            fileUrl = req.file.filename
        }else{
            if(musicToAlterate.fileUrl === undefined){
                res.status(400).json({msg: 'Campo Musica não pode ser nulo'})
                return
            }
            music.fileUrl = musicToAlterate.fileUrl
        } 

        if (name !== undefined){
            music.name = name
        }else{
            music.name = musicToAlterate.name
        }

        if (artist !== undefined){
            music.artist = artist
        }else{
            music.artist = musicToAlterate.artist
        }

        if (album !== undefined){
            music.album = album
        }else{
            music.album = musicToAlterate.album
        }

        if (genre !== undefined){
            music.genre = genre
        }else{
            music.genre = musicToAlterate.genre
        }

        if (letter !== undefined){
            music.letter = letter
        }else{
            music.letter = musicToAlterate.letter
        }

        await Musics.findOneAndUpdate(
            {_id: id},
            {$set: music},
            {new: true}
        )
        res.status(200).json({msg: "Música atualizado com sucesso"})
    }

    static async delete(req, res){
        //TODO: somente admin consege fazer isso, adicionar verificação de conta por token
        const { id } = req.params
        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "Não é um id válido"})
            return
        }
        try {
            await Musics.findByIdAndDelete({_id: id})
            res.status(200).json({msg: "Música removida com sucesso"})
        } catch (error) {
            res.status(500).json({error})
        }
    }

    static async play(req, res){
        try {
            const { id } = req.params
            console.log(id)

            if(!ObjectId.isValid(id)){
                return res.status(422).json({msg: "Não é um id válido"})
            }

            const music = await Musics.findById(id)
            console.log(music)
            if(!music){
                return res.status(400).json({msg: "Música não encontrada"})
            } 
            if(!music.fileUrl){
                return res.status(400).json({msg: "Música sem arquivo de música"})
            }
            if(!fs.existSync(filePath)){
                return res.status(404).json({msg: "Arquivo não encontrado"})
            }
            const filePath = path.join(__dirname, '..', "public", "musics", music.fileUrl)
            res.sendFile(filePath);
        }
            catch (error) {
            res.status(500).json({msg: "Erro ao reproduzir a música", error})
        }
        
    }

    static async search(req, res){
        const musicReq = req.query.musicReq
        console.log(musicReq)
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