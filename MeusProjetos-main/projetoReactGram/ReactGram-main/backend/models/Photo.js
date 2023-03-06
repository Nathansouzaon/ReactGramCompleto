const mongoose = require("mongoose");
const {Schema} = mongoose;

const photoSchema = new Schema(
{
    //instanciando a classe e criando os obj dos campos
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId, //string de id 
    userName: String,

},{
    timestamps:true
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports =  Photo;