//vai ficar pronto pra app toda vai servir pra delete update pro post etc 

export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

export const requestConfig = (method, data, token = null, image = null) => {

    let config;

    if(image){
        config = {
            method:method,
            body:data,
            headers: {},
        };
    }else if(method === "DELETE" || data === null){
        config = {
            method:method,
            headers: {},
        };
    }else{
        config = {
            method:method,
            body: JSON.stringify(data), 
            headers: {
                "Content-Type": "application/json",
            },
        };
    } 

    if(token){
        config.headers.authorization = `Bearer ${token}`
    }

    return config;
}