import React from 'react';

import Icons from './assets/icons';


const LogoCompleta: React.FC = () => {
    return (
        <a href="/pages/home">
            <div className="flex items-center space-x-1">
                <img src={Icons.solarHeartBroken} alt="Coração" className="h-10 w-10" />
                <span className="premautTitle">PREMAUT</span>
            </div>
        </a>
    );
};

export default LogoCompleta;
