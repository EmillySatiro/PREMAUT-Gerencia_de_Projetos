import React from 'react';
import styles from '@/app/styles/topbar.module.css';

import Colors from '@/app/components/assets/color';
import Image from '@/app/components/assets/images';
import Icons from '@/app/components/assets/icons';

export const BottomBar: React.FC = () => {
  return (
    <footer
      className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${Image.fundoTopBottom} )`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '64px',
      }}
    >
      {/* Logo */}
      <div className="flex items-center space-x-1">
        <img src={Icons.solarHeartBroken} alt="Coração" className="h-8 w-8 sm:h-10 sm:w-10" />
        <span className={`${styles.premautTitle} text-sm sm:text-base`}>PREMAUT</span>
      </div>
      
      {/* Social Media Links */}
      <div className="flex items-center space-x-3">
        <a 
          href="#" 
          aria-label="Instagram"
          className="transition-transform hover:scale-110"
        >
          <div
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'transparent', border: `2px solid ${Colors.azulBase}` }}
          >
            <img src={Icons.mdi_instagram} alt="Instagram" className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </a>
        <a 
          href="#" 
          aria-label="YouTube"
          className="transition-transform hover:scale-110"
        >
          <div
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'transparent', border: `2px solid ${Colors.azulBase}` }}
          >
            <img src={Icons.mdi_youtube} alt="YouTube" className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </a>
      </div>

      {/* Copyright (opcional) */}
      <div className="text-xs sm:text-sm text-gray-600 text-center sm:hidden">
        © 2024 PREMAUT - Todos os direitos reservados
      </div>
    </footer>
  );
};

export default BottomBar;
