const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    //instanciar a classe  
    name:String,
    email:String,
    password:String,
    profileImage:String,
    bio:String,
},
{
    timestamps: true
}
);

//definindo o model user, e passando o schema para esse model
const User = mongoose.model("User", userSchema)

module.exports = User;

//é usado no controller para fazer as ações com meu banco