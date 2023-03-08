import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos: [],
    photo: {},
    error:false,
    success:false,
    loading: false,
    message: null
}


//publish an user photo

export const publishPhoto = createAsyncThunk(
    "photo/publish", //thunk me permite pegar o token por exemplo
    async(photo, thunkAPI) =>{

        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.publishPhoto(photo, token);

        //check for erros 
        if(data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        } 

        return data;
    }
) 


export const getUserPhotos = createAsyncThunk(
    "photo/userPhotos",
    async(id, thunkAPI) => {


        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getUserPhotos(id, token);

            return data;

    }
)

//delete a photo

export const deletePhoto = createAsyncThunk(
    "photo/delete",
    async(id, thunkAPI) => {
        
        const token = thunkAPI.getState().auth.user.token; 

        const data = await photoService.deletePhoto(id, token);

          //check for erros 
          if(data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        } 

        return data;
    }
)

//update a photo

export const updatePhoto = createAsyncThunk(
    "photo/update",
    async(photoData, thunkAPI) => { 

        const token = thunkAPI.getState().auth.user.token; 

        const data = await photoService.updatePhoto(
         {title: photoData.title}, 
         photoData.id, 
         token
         );
      
        return data;
    }
) 

//get photo by id

export const getPhoto = createAsyncThunk(
    "photo/getphoto", 
    async(id, thunkAPI) => { 
        const token = thunkAPI.getState().auth.user.token; 

        const data = await photoService.getPhoto(id, token);

        return data;
    }
)
    


export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(publishPhoto.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
            state.photos.unshift(state.photo);
            state.message = "Foto publicada com sucesso!"; 
        }).addCase(publishPhoto.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
        }).addCase(getUserPhotos.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getUserPhotos.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload;
        }).addCase(deletePhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(deletePhoto.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = state.photos.filter((photo) => {
                //se a foto tiver o id igual ao id que deletei excluo do array 
                //se a foto id e diferente do payload._id por que esse id vem da api 
                return photo._id !== action.payload.id;
            });
            state.message = action.payload.message;//mensage que vem da api
        }).addCase(updatePhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updatePhoto.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;

            state.photos.map((photo) => {
                if(photo._id === action.payload.photo._id){
                  //id da foto ele vem do backend como res a foto que foi atualiza e retornada 
                  //photo._id e cada uma das fotos do state que a gente preenche quando da o get 
                  return (photo.title = action.payload.photo.title);
                } 
                return photo;
        });

            state.message = action.payload.message;//mensage que vem da api
        }).addCase(updatePhoto.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
        }).addCase(getPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getPhoto.fulfilled, (state, action)=> {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload;
        });
    },
});


export const {resetMessage} = photoSlice.actions;
export default photoSlice.reducer;