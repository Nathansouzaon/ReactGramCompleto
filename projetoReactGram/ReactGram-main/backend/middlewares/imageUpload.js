const multer = require("multer");
const path = require("path");

// Destination to store image

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        //destino padrão
        let folder = "";

        if(req.baseUrl.includes("users")){
            folder = "users"
        }else if(req.baseUrl.includes("photos")){
            folder = "photos"
        }

        cb(null, `uploads/${folder}/`);//destino da image
    },
    filename: (req, file, cb) =>{
        //nome do arquivo padrão não quero que fique com o mesmo nome do arquivo que o usuário envia se não vou ter substituição de imagem de usuario e fotos

        cb(null, Date.now() + path.extname(file.originalname))//pego a extensão da foto
    }
})

//checa se no fim do arquivo verifica se tenho a extensão de jgp ou png
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            //upload only png and jpg formats

            return cb(new Error("Porfavor envie apenas png ou jpg"))
        }
        cb(undefined, true);
    }
})

module.exports = {imageUpload};