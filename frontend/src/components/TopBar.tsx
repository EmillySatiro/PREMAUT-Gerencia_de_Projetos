import React from 'react';
import './TopBar.css';

interface TopBarProps {
  background_image?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  background_image,
}) => {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between h-25 px-6 topbar-header"
      style={background_image ? { backgroundImage: `url('${background_image}')` } : {}}
    >
      <a href="/pages/home">
        <div className="flex items-center space-x-1">
          <img src="/assets/images/solar_heart-broken.svg" alt="Coração" className="h-10 w-10" />
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
            stroke="currentColor" // Usar currentColor e definir a cor no CSS
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
