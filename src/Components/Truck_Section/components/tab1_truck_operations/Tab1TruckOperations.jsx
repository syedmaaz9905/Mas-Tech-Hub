import React, { useState, useEffect } from 'react';
import './tab1TruckOperations.css';
import { MdDeleteForever } from "react-icons/md";
import { SiDavinciresolve } from "react-icons/si";
import axios from 'axios';
import Swal from 'sweetalert2';

let API_URL = 'https://backend.srv533347.hstgr.cloud/'
const Tab1TruckOperations = ({ user_details, set_backdrop }) => {
    const [formData, setFormData] = useState({
        truckLocation: '',
        boothLocation: '',
        request: '',
        notes: '',
        assignedDriver: '',
        priority: '',
    });
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
            .catch(err => { set_backdrop(false); console.warn(err) });
    }, []);


    const [operations, setOperations] = useState(() => {
        const savedOperations = localStorage.getItem('operations');
        return savedOperations ? JSON.parse(savedOperations) : [];
    });

    const [requestNumber, setRequestNumber] = useState(() => {
        const savedRequestNumber = localStorage.getItem('requestNumber');
        return savedRequestNumber ? parseInt(savedRequestNumber) : 1;
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const addOperation = () => {
        const newOperation = {
            requestNumber: requestNumber,
            formData: {
                truckLocation: formData.truckLocation,
                boothLocation: formData.boothLocation,
                request: formData.request,
                notes: formData.notes,
                assignedDriver: formData.assignedDriver,
                priority: formData.priority,
            },
            assignedDriver: 'N/A',
            requestTimeStamp: new Date().toLocaleString(),
            requestTimeElapsed: 0,
            resolved: false,
        };

        // console.log('FORMMMMMMMMMMMDAATAAAAAAAAAAAAAAA', formData)

        const updatedOperations = [...operations, newOperation];
        setOperations(updatedOperations);
        localStorage.setItem('operations', JSON.stringify(updatedOperations));

        setRequestNumber(requestNumber + 1);
        localStorage.setItem('requestNumber', requestNumber + 1);

        setFormData({
            truckLocation: '',
            boothLocation: '',
            request: '',
            notes: '',
            assignedDriver: '',
            priority: '',
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setOperations((prevOperations) =>
                prevOperations.map((operation) => ({
                    ...operation,
                    requestTimeElapsed: operation.requestTimeElapsed + 1,
                }))
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem('operations', JSON.stringify(operations));
    }, [operations]);

    const deleteOperation = (requestNumber) => {
        const updatedOperations = operations.filter((operation) => operation.requestNumber !== requestNumber);
        setOperations(updatedOperations);
        localStorage.setItem('operations', JSON.stringify(updatedOperations));
    };

    const resolveOperation = (requestNumber) => {
        const updatedOperations = operations.map((operation) =>
            operation.requestNumber === requestNumber
                ? { ...operation, resolved: !operation.resolved }
                : operation
        );
        setOperations(updatedOperations);
        localStorage.setItem('operations', JSON.stringify(updatedOperations));
    };

    const exportToCSV = () => {
        if (operations.length === 0) {
            alert("No operations to export.");
            return;
        }

        const headers = [
            "Request Number",
            "Truck Location",
            "Booth Location",
            "Request",
            "Notes",
            "Assigned Driver",
            "Request TimeStamp",
            "Request Time Elapsed",
            "Priority",
            "Resolved"
        ];

        const rows = operations.map(operation => [
            operation.requestNumber,
            operation.truckLocation,
            operation.boothLocation,
            operation.request,
            operation.notes,
            operation.assignedDriver,
            operation.requestTimeStamp,
            operation.requestTimeElapsed,
            operation.priority,
            operation.resolved ? "Yes" : "No"
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "operations.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="tabMainContainer">
            <div className="form-container">
                <input
                    type="text"
                    name="truckLocation"
                    value={formData.truckLocation}
                    onChange={handleChange}
                    placeholder="Truck Location"
                    className="input"
                />
                <input
                    type="text"
                    name="boothLocation"
                    value={formData.boothLocation}
                    onChange={handleChange}
                    placeholder="Booth Location"
                    className="input"
                />
                <input
                    type="text"
                    name="request"
                    value={formData.request}
                    onChange={handleChange}
                    placeholder="Request"
                    className="input"
                />
                <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Notes"
                    className="input"
                />
                <select
                    name="assignedDriver"
                    value={formData.assignedDriver}
                    onChange={handleChange}
                    className="input"
                >
                    {!formData.assignedDriver && <option value="" disabled hidden>Assigned Driver</option>}
                    {drivers.map((driver, index) => (
                        <option key={index} value={driver.DriverID}>{driver.DriverName}</option>
                    ))}
                </select>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="input"
                >
                    {!formData.priority && <option value="" disabled hidden>Priority</option>}
                    <option value="low">Low</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className='btn-truck-operations-main'>
                <button className='btn-truck-operations' onClick={addOperation}>
                    Add Operation
                </button>
                <button className='btn-truck-operations' onClick={exportToCSV}>
                    Export to CSV
                </button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Request Number</th>
                            <th>Truck Location</th>
                            <th>Booth Location</th>
                            <th>Request</th>
                            <th>Notes</th>
                            <th>Assigned Driver</th>
                            <th>Request TimeStamp</th>
                            <th>Request Time Elapsed (s)</th>
                            <th>Driver Assigned Time Elapsed (s)</th>
                            <th>ReAssigned Time Elapsed (s)</th>
                            <th>Priority</th>
                            <th>Delete</th>
                            <th>Resolve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operations.map((operation) => (
                            <tr key={operation.requestNumber} className={operation.resolved ? 'resolved' : ''}>
                                <td>{operation.requestNumber}</td>
                                <td>{operation.formData.truckLocation}</td>
                                <td>{operation.formData.boothLocation}</td>
                                <td>{operation.formData.request}</td>
                                <td>{operation.formData.notes}</td>
                                <td>{operation.formData.assignedDriver}</td>
                                <td>{operation.requestTimeStamp}</td>
                                <td>{operation.requestTimeElapsed}</td>
                                <td>0:00</td>
                                <td>0:00</td>
                                <td>{operation.formData.priority}</td>
                                <td><MdDeleteForever className='deleteIconTable' onClick={() => deleteOperation(operation.requestNumber)} /></td>
                                <td><SiDavinciresolve className='resolveIconTable' onClick={() => resolveOperation(operation.requestNumber)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tab1TruckOperations;