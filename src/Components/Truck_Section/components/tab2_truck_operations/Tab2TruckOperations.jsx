import React, { useState, useEffect } from 'react';
import './tab2TruckOperations.css';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';

let API_URL = 'https://backend.srv533347.hstgr.cloud/';
const Tab2TruckOperations = ({user_details, set_backdrop}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [driverName, setDriverName] = useState('');
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        set_backdrop(true);
        axios.get(API_URL + 'get_truck_drivers', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            // console.log(response.data);
            set_backdrop(false);
            setDrivers(response.data);
        })
            .catch(err => {set_backdrop(false); console.warn(err)});
    }, []);


    const handleAddDriver = () => {
        
        if (driverName.trim()) {
            set_backdrop(true);
            axios.post(API_URL + 'add_driver', {
                driverName: driverName,
                accountID: user_details.ID
            }).then((response) => {
                if (response.status === 200) {
                    set_backdrop(false);
                    const updatedDrivers = [...drivers, { DriverName: driverName }];
                    setDrivers(updatedDrivers);
                    setDriverName('');
                    setModalOpen(false);
                }
            }).catch((error) => {
                console.log("Error", error);
                set_backdrop(false);
                setDriverName('');
                setModalOpen(false);
                alert("Error");
            })
            
        }
    };

    const handleDeleteDriver = (index) => {
        const updatedDrivers = drivers.filter((_, i) => i !== index);
        setDrivers(updatedDrivers);
        localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
    };

    return (
        <div className='tabMainContainer'>
            <div className='btn-driver-profile-main'>
                <button className='btn-driver-profile' onClick={() => setModalOpen(true)}>
                    <p>Add a driver</p>
                </button>
            </div>

            {modalOpen && (
                <div className='modal-truck'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setModalOpen(false)}>&times;</span>
                        <h2>Add Driver</h2>
                        <input
                            type="text"
                            value={driverName}
                            onChange={(e) => setDriverName(e.target.value)}
                            placeholder="Enter driver name"
                        />
                        <div className='btn-driver-profile-main-modal'>
                            <button className='btn-driver-profile-modal-add' onClick={handleAddDriver}>Add Driver</button>
                            <button className='btn-driver-profile-modal-cancel' onClick={() => setModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {drivers.length > 0 && (
                <div className='table-container'>
                    <table className='drivers-table'>
                        <thead>
                            <tr>
                                <th>Driver's Name</th>
                                <th>Request Number</th>
                                <th>Booth Location</th>
                                <th>Truck Location</th>
                                <th>Request</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.map((driver, index) => (
                                <tr key={index}>
                                    <td>{driver.DriverName}</td>
                                    <td>{driver.RequestNumber || 'N/A'}</td>
                                    <td>{driver.BoothLocation || 'N/A'}</td>
                                    <td>{driver.TruckLocation || 'N/A'}</td>
                                    <td>{driver.Request || 'N/A'}</td>
                                    <td>
                                        <MdDeleteForever className='deleteIconTable' onClick={() => handleDeleteDriver(index)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Tab2TruckOperations;
