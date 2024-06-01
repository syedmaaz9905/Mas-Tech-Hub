import React from 'react'
import './top.css'

// Imported Icons
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

// Imported Images
import img from '../../../Assets/Images/profile.png'
import { useNavigate } from 'react-router-dom';

const Top = () => {

    const navigate = useNavigate()

    return (
        <div className='topSection'>
            <div className="headerSection flex">
                <div className="title">
                    <h1>Welcome to Mas Tech Hub</h1>
                    <p>Hello Admin, Welcome back!</p>
                </div>

                {/* <div className="searchBar flex">
                    <input type="text" placeholder='Search Dashboard' />
                    <BiSearchAlt className='icon' />
                </div> */}

                <div className="adminDiv flex">
                    <MdOutlineEmail className='icon' />
                    <RiLogoutCircleLine className='icon' onClick={() => navigate('/signin')} />

                    <div className="adminImage">
                        <img src={img} alt="Admin Image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Top