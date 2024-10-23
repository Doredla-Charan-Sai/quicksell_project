import React from 'react';
import './index.css';

const UserAvatar = ({ name }) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : 'U';
    const backgroundColor = '#007bff';
    
    return (
        <div className="avatar" style={{ backgroundColor }}>
            {firstLetter}
        </div>
    );
};

export default UserAvatar
