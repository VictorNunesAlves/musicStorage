const jwt = require ("jsonwebtoken")

const User = require('../models/User')

const getUserByToken = async (token) => { 
    if(!token){
        return res.status(401).json({msg: "Acesso negado"}
        )
    }

    const decod = jwt.verify(token, 'aosifnsoidfn3243oimasopidnf1')
    const id = decod.id
    const user = await User.findById(id)

    if(!user){
        return res.status(422).json({msg: "Usuário não encontrado"})
    }

    return user
 }