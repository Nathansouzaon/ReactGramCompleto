import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false
};

//Register an user and sign in 

export const register = createAsyncThunk("auth/register",  
 async (user, thunkApi) => {

    const data = await authService.register(user); 

    //check for errors

    if(data.errors){
        return thunkApi.rejectWithValue(data.errors[0]);
    }
    //esse dada meus dados eu pego esses dados pela minha action
    return data;//usario cadastrado

 }); 

 //Register an user and sign in 

export const login = createAsyncThunk("auth/login",  
async (user, thunkApi) => {

   const data = await authService.login(user); 

   //check for errors

   if(data.errors){
       return thunkApi.rejectWithValue(data.errors[0]);
   }
   //esse dada meus dados eu pego esses dados pela minha action
   return data;//usario cadastrado

}); 


  export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
  })

 //agora posso acessar o slice de autenticação e pegar os dados do user
 const authSlice = createSlice({
    //e assim que vai ser chamado no store do redux e assim extraio os valores por meio desse nome
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = false
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        //partes das execuções que eu faço na api vai trabalhar diretamente com os estados atuais de cada requisição builder que vai criar essas ações separadamente 
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(register.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;//pegando erro e exibindo
            state.user = null;
        }).addCase(logout.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user =  null;//não tem mais state do user
        }).addCase(login.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(login.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        }).addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;//pegando erro e exibindo
            state.user = null;
        });
    },
 });


 export const { reset } = authSlice.actions; 
 export default authSlice.reducer;








 //thunkAPI me permite utilizar algumas funções extras como parar a execução e identificar um erro da api