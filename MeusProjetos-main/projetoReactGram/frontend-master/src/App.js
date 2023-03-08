import './App.css'; 

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 


import { useAuth } from './hooks/useAuth';

import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/Photo';

function App() { 

    const {auth, loading} = useAuth(); 


    console.log(loading);

    if(loading){
      return <p>Carregando...</p>
    }
 

  return (
    <div className="App">
          <BrowserRouter> 
            <NavBar/>
            <div className="container">
                <Routes>
                  <Route path="/" element={auth ? <Home/> : <Navigate to="/login"/>}/>
                  <Route path="/profile" element={auth ? <EditProfile/> : <Navigate to="/login"/>}/>
                  <Route path="/users/:id" element={auth ? <Profile/> : <Navigate to="/login"/>}/>
                  <Route path="/login" element={!auth ? <Login/> : <Navigate to="/"/>}/>
                  <Route path="/register" element={!auth ? <Register/> : <Navigate to="/"/>}/>
                  <Route path="/photos/:id" element={auth ? <Photo/> : <Navigate to="/login"/>}/>
                </Routes> 
            </div>
            <Footer/>
          </BrowserRouter>
    </div>
  );
}

export default App;
