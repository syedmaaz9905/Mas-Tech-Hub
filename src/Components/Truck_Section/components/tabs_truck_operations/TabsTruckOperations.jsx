import React, { useState } from 'react';
import './tabTruckOperations.css';
import Tab1TruckOperations from '../tab1_truck_operations/Tab1TruckOperations';

const TabsTruckOperations = () => {
    const [activeTab, setActiveTab] = useState('Operations');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="tabs-container">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'Operations' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Operations')}
                >
                    Operations
                </button>
                <button
                    className={`tab ${activeTab === 'Driver Profile' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Driver Profile')}
                >
                    Driver Profile
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'Operations' && <div><Tab1TruckOperations /></div>}
                {activeTab === 'Driver Profile' && <div>Driver Profile Content</div>}
            </div>
        </div>
    );
};

export default TabsTruckOperations;
