import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';
import Sidebar from './Components/Sidebar_Section/Sidebar';
import Body from './Components/Body_Section/Body';
import SigninPage from './Pages/SigninPage';


function getToken() {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  }

const Dashboard = () => {
    const [activeItem, setActiveItem] = useState('home');
    return (
        <div className='container'>
            <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
            <Body activeItem={activeItem} />
        </div>
    );
};

const App = () => {
    const [token, setToken] = useState(getToken());
    return (
        <Router>
            <Routes>
            {/* element={token?<Navigate to={`/${path_roles[token.role]}`}/>:<LoginPage set_token={setToken} />} */}
                <Route path="/signin" element={token ? <Navigate to={`/dashboard`}/>:<SigninPage set_token={setToken} />} />
                <Route path="/dashboard" element={token ? <Dashboard user_details={token}/>:<Navigate to={`/signin`}/>} />
                <Route path="/" element={token ? <Navigate to={`/dashboard`}/>:<Navigate to={`/signin`}/>} />
            </Routes>
        </Router>
    );
};

export default App;
