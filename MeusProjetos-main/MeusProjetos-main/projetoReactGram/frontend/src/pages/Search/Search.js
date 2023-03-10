import './Search.css';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'; 
import {useQuery} from '../../hooks/useQuery'; 


import LikeContainer from '../../components/LikeContainer';
import PhotoItem from '../../components/PhotoItem'; 

import { Link } from 'react-router-dom'; 

//redux
import { searchPhotos, like } from '../../slices/photoSlice'; 
const Search = () => { 

    const query = useQuery(); 
    //pega o que o usuário digita na url
    const search = query.get("q");  

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth);
    const { photos, loading} = useSelector((state) => state.photo);

    useEffect(() => {
      //carregando as fotos baseados na busca
        dispatch(searchPhotos(search));

    }, [dispatch, search])// e o que faz o disparo do useeffect

      //like a photo 

    const handleLike = (photo) => { 

        dispatch(like(photo._id));
        
        resetMessage();
    }  

    if(loading){
        return <p>Carregando...</p>
    }

  return (
    <div id="search">
         <h1>Você está buscando por: {search}</h1>
         {photos && photos.map((photo) => (
            <div key={photo._id}>
            <PhotoItem photo={photo}/> 
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}> Ver mais </Link>
          </div> 
         ))}
        {photos && photos.length === 0 && (
            <>
            <h2 className="no-photos">
              Não foram encontrados resultados para sua busca...
            </h2>
              <Link className="btn" to={`/`}> Voltar para Home</Link>
            </>
        )}
    </div>
  )
}

export default Search;