import React, { useState } from 'react';
import './adminOperationsBody.css';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const AdminOperationsBody = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(10);
    const tableData = [
        { name: 'Jane Smith', email: 'jane@example.com', accountType: 'Vendor', status: 'Pending' },
        { name: 'John Doe', email: 'john@example.com', accountType: 'Admin', status: 'Active'  },
        { name: 'Jane Smith', email: 'jane@example.com', accountType: 'Vendor', status: 'Active'  },
        { name: 'John Doe', email: 'john@example.com', accountType: 'Admin', status: 'Pending'  },
        { name: 'Jane Smith', email: 'jane@example.com', accountType: 'Vendor', status: 'Pending'  },
        { name: 'John Doe', email: 'john@example.com', accountType: 'Admin', status: 'Pending'  },
        { name: 'Jane Smith', email: 'jane@example.com', accountType: 'Admin', status: 'Active'  },
        { name: 'John Doe', email: 'john@example.com', accountType: 'Admin', status: 'Pending'  },
        { name: 'Jane Smith', email: 'jane@example.com', accountType: 'Vendor', status: 'Pending'  },
        { name: 'John Doe', email: 'john@example.com', accountType: 'Admin', status: 'Active'  },
        { name: 'Jane Smith', email: 'jane@example.com', accountType: 'Vendor', status: 'Active'  },
        { name: 'John Doe', email: 'john@example.com', accountType: 'Admin', status: 'Active'  },
        { name: 'Jane Smith', email: 'jane@example.com', accountType: 'Admin', status: 'Active'  },
        { name: 'John Doe', email: 'john@example.com', accountType: 'Vendor', status: 'Pending'  },
        { name: 'Jane Smith', email: 'jane@example.com', accountType: 'Vendor', status: 'Pending'  },
    ];

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredData = tableData.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
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
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.accountType}</td>
                                <td style={{ color: row.status === 'Active' ? 'green' : 'red' }}>{row.status}</td>
                                <td>
                                    <div className='table-action-buttons'>
                                        <button className='table-action-button-accept'>Accept</button>
                                        <button className='table-action-button-cancel'>Cancel</button>
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
    );
};

export default AdminOperationsBody;
