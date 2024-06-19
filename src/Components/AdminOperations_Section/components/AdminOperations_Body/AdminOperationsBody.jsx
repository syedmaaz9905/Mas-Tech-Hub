import React, { useEffect, useState } from 'react';
import './adminOperationsBody.css';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

let API_URL = 'https://backend.srv533347.hstgr.cloud/';
const AdminOperationsBody = ({ user_data, set_user_data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(10);
    const [open, setOpen] = useState(false);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleDelete = (id) => {
        setOpen(true)
        axios.delete(API_URL + 'delete_user', {
            params: {
                id: id
            }
        }).then((response) => {
            if (response.data) {
                set_user_data(user_data.filter(row => row.ID !== id));
                setOpen(false)
            }
            else {
                console.log(response.data);
                setOpen(false)
            }
        }).catch((err) => {
            console.log(err);
            setOpen(false)
        })
        
    };

    const handleActiveInactive = (id, stat) => {
        setOpen(true)
        let status = "active";
        if (stat === "active") {
            status = "inactive";
        }
        axios.put(API_URL + 'update_user_status',
            { status: status, id: id }).then((response) => {
                if (response.data) {
                    set_user_data(user_data.map(row => {
                        if (row.ID === id) {
                            row.AccountStatus = status;
                        }
                        return row;
                    }));
                    setOpen(false)
                }
                else {
                    console.log(response.data);
                    setOpen(false)
                }
            }).catch((err) => {
                console.log(err);
                setOpen(false)
            })
    };

    const filteredData = user_data.filter(row =>
        row.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
    }

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="admin-operations-body">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
                <div className="table-container">
                    <table className="responsive-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Account Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map((row, index) => (
                                <tr key={row.ID}>
                                    <td>{row.Name}</td>
                                    <td>{row.Email}</td>
                                    <td>{row.Role}</td>
                                    <td style={{ color: row.AccountStatus === 'active' ? 'green' : 'red' }}>{toTitleCase(row.AccountStatus)}</td>
                                    <td>
                                        <div className='table-action-buttons'>
                                            <button className='table-action-button-accept' onClick={() => { handleActiveInactive(row.ID, row.AccountStatus) }}>
                                                {row.AccountStatus === 'inactive' ? 'Activate' : 'InActivate'}</button>
                                            <button className='table-action-button-cancel' onClick={() => { handleDelete(row.ID) }}>
                                                Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {filteredData.length > entriesPerPage && (
                    <div className="pagination">
                        <button className='pagination-button-prev' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                            <FaAngleLeft />
                            <p>Prev</p>
                        </button>
                        <button className='pagination-button-next' onClick={() => paginate(currentPage + 1)} disabled={indexOfLastEntry >= filteredData.length}>
                            <p>Next</p>
                            <FaAngleRight />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminOperationsBody;
