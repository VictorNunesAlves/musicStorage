const User = require('../models/User')
const Users = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')

const getUserByToken = require('../helpers/get-user-by-token')
const createUserToken = require('../helpers/create-user-token')
module.exports = class UserController {
    
    static async create(req, res){
        const {name, email, password, confirmPass} = req.body

        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }
        if(!email){
            res.status(422).json({message: 'O email é obrigatório'})
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }
        if(!confirmPassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatória'})
            return
        }
        if(password !== confirmPassword){
            res.status(422).json({message: 'As senhas não conferem'})
            return
        }
        const userExist = await User.findOne({email: email})
        if(userExist){
            res.status(422).json({msg: "Já existe um usuário com este email"})
        }
        const salt = bcrypt.genSalt(12)
        const passHash = bcrypt.hash(password, salt)

        const user = new User({
            name: name,
            email: email,
            password: passhash
        })

        try {
            const newUser = await user.save
            createUserToken(user, req, res)
        } catch (error) {
            res.status(500).json({msg: 'erro', error})
        }
    }
}