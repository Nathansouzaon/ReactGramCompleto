//extrair o valor dentro da query string

import { useLocation } from "react-router-dom";
import { useMemo } from "react";//consigo encapsular esse valor e ele não altere o estado do meu componente se ele for acessado entao guarda o valor em algum lugar e não re renderiza se a gente utilizar esse valor em algum lugar ou modificar ele por algum motivo  

export function useQuery() {
     
    const {search} = useLocation();


    //consigo extrair os dados da url como se fossem objetos acesso .q e ele me da metodos tipo o get 
    return useMemo(() => new URLSearchParams(search), [search]); 
}
