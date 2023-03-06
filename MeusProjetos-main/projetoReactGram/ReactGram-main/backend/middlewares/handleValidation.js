const {validationResult} = require("express-validator");
//next deixar prosseguir ou parar
const validate = (req, res, next) => {
 
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    } 

    //se tiver erro 

    const extractedErros = [];

    errors.array().map((err) => extractedErros.push(err.msg));

    return res.status(422).json({
        errors: extractedErros,
    });
};

module.exports = validate;
