const senha = "123456"

const authMiddleware = (req, res, next) => {
    const senhaEnviada = req.headers.senha

    if(senhaEnviada !== senha) {
        return res.status(403).send({ messagem: "Acesso negado!"})
    }

    next()
}

module.exports = {
    authMiddleware
}