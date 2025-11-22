import React from 'react';
import styles from '@/app/styles/topbar.module.css';
import Colors from '@/app/components/color';

export const BottomBar: React.FC = () => {
  return (
    <footer
      className="flex items-center justify-between h-16 px-6"
      style={{
        backgroundImage: "url('/assets/images/fundo_top_bottom.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center space-x-1">
        <img src="/assets/images/solar_heart-broken.svg" alt="Coração" className="h-10 w-10" />
        <span className={styles.premautTitle}>PREMAUT</span>
      </div>
      <div className="flex items-center space-x-2">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'transparent', border: `2px solid ${Colors.azulBase}` }}
        >
          <img src="/assets/images/mdi_instagram.svg" alt="Instagram" className="h-6 w-6" />
        </div>
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'transparent', border: `2px solid ${Colors.azulBase}` }}
        >
          <img src="/assets/images/mdi_youtube.svg" alt="YouTube" className="h-6 w-6" />
        </div>
      </div>

    </footer>
  );
};

export default BottomBar;
