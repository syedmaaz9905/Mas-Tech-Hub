import React, { useState, useEffect } from 'react';
import './tab2TruckOperations.css';
import { MdDeleteForever } from 'react-icons/md';

const Tab2TruckOperations = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [driverName, setDriverName] = useState('');
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const savedDrivers = localStorage.getItem('drivers');
        if (savedDrivers) {
            setDrivers(JSON.parse(savedDrivers));
        }
    }, []);

    const handleAddDriver = () => {
        if (driverName.trim()) {
            const updatedDrivers = [...drivers, { name: driverName }];
            setDrivers(updatedDrivers);
            localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
            setDriverName('');
            setModalOpen(false);
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
                                    <td>{driver.name}</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
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
