const User = require("../models/User");
const jwt = require("jsonwebtoken");//COMPARAÇÃO DO TOKEN EVITA QUE EU FAÇA ISSO EM TODAS AS ROTAS
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async(req, res, next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];//pegando a segunda parte do header com split bearer // yy12s1d23as1d1a

    // check if header has a token

    if(!token) return res.status(401).json({errors: ["Acesso negado!"]});

    //check if token is valid 

    try {

        const verified = jwt.verify(token, jwtSecret);//compara o token com o nosso secret se tiver o secret e o token válido
        
        req.user = await User.findById(verified.id).select("-password") //tenta achar o user e extrai dados do usuario sem usar consultas no banco pra puxar o user de novo

        next();//prossegue a req
    } catch (error) {
        res.status(401).json({errors: ["Token inválido."]})
        
    }
}

module.exports = authGuard;