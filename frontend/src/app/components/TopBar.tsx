import React from 'react';
import Colors from './assets/color';

import Image from './assets/images';
import Icons from './assets/icons';

interface TopBarProps {
  background_image?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  background_image = Image.fundoGirassol,
}) => {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between h-25 px-6"
      style={{
        backgroundImage: `url('${background_image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(246, 244, 240,0.7)',
        backgroundBlendMode: 'overlay',
      }}
    >
      <a href="/pages/home">
        <div className="flex items-center space-x-1">
          <img src={Icons.solarHeartBroken} alt="Coração" className="h-10 w-10" />
          <span className="premautTitle">PREMAUT</span>
        </div>
      </a>

      <div className="flex items-center space-x-3">
        <button
          type="button"
          aria-label="Mostrar lista"
          title="Mostrar lista"
          className="flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke={Colors.azulEscuro}
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
