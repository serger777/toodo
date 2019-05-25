import React from 'react';
import './app-header.css';


const AppHeader = ({todo, done}) => {
    return (
        <div className="app-header">
            <h1>My TodoLIst</h1>
            <h3>{todo} more to do, {done} done</h3>
        </div>

    )
};
export default AppHeader;