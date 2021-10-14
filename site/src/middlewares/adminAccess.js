let admins = ["Agustina", "Claudia", "Damian", "Soledad"]

const access = (req,res,next) => {
    if(admins.includes(req.query.user)) {
        next()
    } else {
        res.send("¡No sos Administradoooor! (´-﹏-`；)")
    }
}

module.exports = access
