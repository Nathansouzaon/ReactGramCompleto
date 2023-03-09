import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

export const useAuth = () =>{
     
    const { user } = useSelector((state) => state.auth);
    
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() =>{
        //é ativado sempre que o user mudar nosso state do redux 
        if(user){
            setAuth(true)
        }else{
            setAuth(false)
        }

        setLoading(false);
    }, [user]) 

    return {auth, loading};//consigo verificar se o user está logado
}