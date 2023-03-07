const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const jwtSecret = process.env.JWT_SECRET;

// Generate user token

const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d",
    });
};

// Register user and sign in 

const register = async(req, res) => {
    
    const {name, email, password} = req.body

    //encontrar o usuario
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({errors: ["Por favor, utilize outro e-mail"]})
        return
    } 

    //generate password hash esconde a senha do user 
    const salt = await bcrypt.genSalt();//gera string aleatoria
    const passWordHash = await bcrypt.hash(password, salt)//senha aleatoria

    //create user 
    const newUser = await User.create({
        name,
        email,
        password: passWordHash    
    })

    // if user was created succesfully, return the token

    if(!newUser){
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser.id)
    });
};


// sign user in 
const login = async(req, res) => {
    
    const {email, password} = req.body
    

    const user = await User.findOne({email})

    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    }
    
    //check if password matches
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors: ["Senha inválida"]})
        return
    }

    //return user with token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user.id)
    });

}
//get current logged in user
const getCurrentUser = async(req, res) =>{
    const user = req.user;

    res.status(200).json(user);//dados do user
}

//update an user 
const update = async(req, res) => {

    const { name, password, bio } = req.body
    
    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
    } 

    const reqUser = req.user 

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password");//esse id do usuario vem da onde? por causa do token

    if(name){
        user.name = name;
    }

    if(password){
        //atualiza a senha do user
            
        //generate password hash esconde a senha do user 
        const salt = await bcrypt.genSalt();//gera string aleatoria
        const passwordHash = await bcrypt.hash(password, salt)//senha aleatoria

        user.password = passwordHash;
    }
    
    if(profileImage){
        user.profileImage = profileImage;
    }

    if(bio){
        user.bio = bio;
    }

    //salvar esses objetos no banco

    await user.save();//espera salvar o user

    res.status(200).json(user);//mando o usuário vamos conseguir ver  todos os campos já alterados
}; 

 const getUserById =  async(req, res) => {
    //extrair id da url e todos os dados do user
    const { id } = req.params 

    //validando id tentando achar o user se não conseguir deu erro de id invalid
    try {
        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password");//encontrando o user pelo id
        
        //check if user exists
        if(!user){
            res.status(404).json({errors: ["Usuário não encontrado."]});
            return
        }   

        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({errors: ["Usuário não encontrado."]});
        return;
    }


    
 }

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
};