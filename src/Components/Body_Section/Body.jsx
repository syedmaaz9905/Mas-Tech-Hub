import React from 'react';
import './body.css';
import Top from './Top_Section/Top';
import Home from '../Home_Section/Home';
import Truck from '../Truck_Section/Truck';
import Vendor from '../Vendor_Section/Vendor';
import Csvdata from '../CsvData_Section/Csvdata';
import Profile from '../Profile_Section/Profile';

const Body = ({ activeItem }) => {
    return (
        <div className='mainContent'>
            <Top />
            {activeItem === 'home' && <Home />}
            {activeItem === 'truck' && <Truck />}
            {activeItem === 'vendor' && <Vendor />}
            {activeItem === 'csvdata' && <Csvdata />}
            {activeItem === 'profile' && <Profile />}
        </div>
    );
};

export default Body;
