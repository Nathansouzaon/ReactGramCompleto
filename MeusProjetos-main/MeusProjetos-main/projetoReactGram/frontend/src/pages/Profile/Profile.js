import './Profile.css'; 

import { uploads } from '../../utils/config';

import Message from '../../components/Message';

import { Link } from 'react-router-dom';

import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'; 

//hooks
 import { useState, useEffect, useRef } from 'react'; 
 import { useSelector, useDispatch } from 'react-redux'; 
 import { useParams } from 'react-router-dom'; 

 //redux
 import { getUserDetails } from '../../slices/userSlice';
 import { publishPhoto, getUserPhotos, deletePhoto, updatePhoto } from '../../slices/photoSlice';
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage';


const Profile = () => { 

    const {id} = useParams();

    //com dispatch eu posso usar as funções de chamar dados
    const dispatch = useDispatch(); 

    const resetMessage = useResetComponentMessage(dispatch);

    const {user, loading} = useSelector((state) => state.user);
    const {user:userAuth} = useSelector((state) => state.auth); 
    const {photos, loading:loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo); 

    //states para inclusão
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(""); 

    //states para edição
    const [editId, setEditId] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editTitle, setEditTitle] = useState("");

    //photo 

    const newPhotoForm = useRef();
    const editPhotoForm = useRef();


    //load user data
    useEffect(() => {

        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));

    }, [dispatch, id]) 


    if(loading) {
         return <p>Carregando....</p>;
    }
    
    
    const handleFile = (e) => {
        //image preview

        const image = e.target.files[0]

        setImage(image);

    } 
 
    const handleSubmit = (e) => {
        e.preventDefault();


        const photoData = {
            title,
            image
        } 

        //builder form data

        const formData = new FormData();

        //essa var vai fazer o loop em todas as chaves do meu do meu objeto photoData
        const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));

        //inserir no form data o objeto chamado photo
        formData.append("photo", photoFormData); 

        dispatch(publishPhoto(formData));

        setTitle(""); 
        
        resetMessage();
    }

    //delete a photo

    const handleDelete = (id) => {

        dispatch(deletePhoto(id));


        resetMessage();
    }; 

    //show or hide forms
    const hideOrShowForms = () => {
        newPhotoForm.current.classList.toggle("hide");
        editPhotoForm.current.classList.toggle("hide");
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        const photoData = {
            title: editTitle,
            id:editId
        }
        dispatch(updatePhoto(photoData)); 

        resetMessage();
    } 

    const handleEdit = (photo) => {
        if(editPhotoForm.current.classList.contains("hide")){
            hideOrShowForms();
        } 

        setEditId(photo._id);
        setEditTitle(photo.title);
        setEditImage(photo.image);
    }

    const handleCancelEdit = (e) => {
        e.preventDefault()  

        hideOrShowForms();
        

    }



  return (
    <div id="profile"> 
        <div className="profile-header">
             {user.profileImage && (
                <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
             )}
             <div className="profile-description">
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
             </div>
        </div> 
        {/* id que eu estou recebendo for igual ao id do user autenticado */}
        {id === userAuth._id && (
            <>
                <div className="nem-photo" ref={newPhotoForm}>
                    <h3>Compartilhe algum momento seu:</h3> 

                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título para a foto: </span>
                            <input 
                                type="text" 
                                placeholder="insira um título" 
                                onChange={(e) => setTitle(e.target.value)} 
                                value={title || ""}/> 
                        </label>
                        <label>
                             <span>Imagem:</span>   
                             <input type="file" onChange={handleFile}/>
                        </label>
                        {!loadingPhoto && <input type="submit" value="Postar" />}
                        {loadingPhoto && (
                            <input type="submit" disabled value="Aguarde..." />
                        )}
                    </form>
                </div>
                <div className="edit-photo hide" ref={editPhotoForm}>
                     <p>Editando:</p>
                     {editImage && (
                        <img src={`${uploads}/photos/${editImage}`} alt={editTitle}/>
                     )}
                     <form onSubmit={handleUpdate}>
                            <span>Editando foto: </span>
                            <input 
                                type="text"  
                                placeholder="Insira um novo titulo"
                                onChange={(e) => setEditTitle(e.target.value)} 
                                value={editTitle || ""}/> 
                         <input type="submit" value="Atualizar" />
                         <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar edição</button>
                     </form>
                </div> 
                {errorPhoto && <Message msg={errorPhoto} type="error"/>}
                {messagePhoto && <Message msg={messagePhoto} type="success"/>}
            </>
        )} 

        <div className="user-photos">
            <h2>Fotos publicadas:</h2>  
             <div className="photos-container">
                {photos && photos.map((photo) => (
                    <div className="photo" key={photo._id}>
                        {photo.image && (<img 
                            src={`${uploads}/photos/${photo.image}`}
                            alt={photo.title}/> 
                    )}
                {id === userAuth._id ? (  
                  <div className="actions">
                     <Link to={`/photos/${photo._id}`}>
                        <BsFillEyeFill/>
                     </Link>
                      <BsPencilFill onClick={() => handleEdit(photo)}/>
                      <BsXLg onClick={() => handleDelete(photo._id)}/>
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
                </div>
                ))} 
                {photos.length === 0 && <p>Ainda não há fotos publicadas</p>}
             </div>
        </div>
    </div>
  )
}

export default Profile;