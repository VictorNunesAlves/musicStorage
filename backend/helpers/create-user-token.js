const jwb = require("jsonwebtoken")

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "aosifnsoidfn3243oimasopidnf1")

    res.status(200).json({msg: "Autenticado com sucesso", id: user._id, name: user.name, tokem: token})
}

module.exports = createUserToken