import React, { useState } from 'react';
import './tabTruckOperations.css';
import Tab1TruckOperations from '../tab1_truck_operations/Tab1TruckOperations';
import Tab2TruckOperations from '../tab2_truck_operations/Tab2TruckOperations';
import Tab3TruckOperations from '../tab3_truck_operations/Tab3TruckOperations';

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
                <button
                    className={`tab ${activeTab === 'Driver Options' ? 'active' : ''}`}
                    onClick={() => handleTabClick('Driver Options')}
                >
                    Driver Options
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'Operations' && <div><Tab1TruckOperations /></div>}
                {activeTab === 'Driver Profile' && <div><Tab2TruckOperations /></div>}
                {activeTab === 'Driver Options' && <div><Tab3TruckOperations /></div>}
            </div>
        </div>
    );
};

export default TabsTruckOperations;
