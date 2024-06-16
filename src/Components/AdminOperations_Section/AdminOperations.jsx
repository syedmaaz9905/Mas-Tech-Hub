import React from 'react'
import './adminOperations.css'
import AdminOperationsBody from './components/AdminOperations_Body/AdminOperationsBody'

const AdminOperations = () => {
    return (
        <div>
            <div className='adminOperationsMain'>
                <div className="adminOperationsTitle">
                    <h2>Admin Operations</h2>
                </div>
            </div>

            <div className='adminOperationsBodyMain'>
                <AdminOperationsBody />
            </div>
        </div>
    )
}

export default AdminOperations