import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './app.css';
import Sidebar from './Components/Sidebar_Section/Sidebar';
import Body from './Components/Body_Section/Body';
import SigninPage from './Pages/SigninPage';

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
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Navigate to="/signin" />} />
            </Routes>
        </Router>
    );
};

export default App;
