import React from 'react';
import styles from '@/app/styles/topbar.module.css';
import Image from '@/app/components/assets/images';
import Icons from '@/app/components/assets/icons';

export const TopBar: React.FC = () => {
  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between h-16 px-6"
      style={{
        backgroundImage: `url(${Image.fundoTopBottom})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(246, 244, 240,0.8)',
      }}
    >
      <div className="flex items-center space-x-1">
        <img src={Icons.solarHeartBroken} alt="Coração" className="h-10 w-10" />
        <span className="premautTitle">PREMAUT</span>
      </div>
      <div
        className="flex items-center space-x-4 px-4 py-2 rounded bg-white shadow-md"
        style={
          { 
            boxShadow: '0 8px 6px rgba(0, 0, 0, 0.3)' 
          }
        }
      >
        <nav className="hidden sm:flex items-center space-x-4">
          <a href="" className={styles.topbarLink}>Inicio</a>
          <a href="#noticias" className={styles.topbarLink}>Noticias</a>
          <a href="#sobre" className={styles.topbarLink}>Sobre</a>
          <a href="/pages/screen-admin" className={styles.topbarLink}>Painel</a>
        </nav>
      </div>
      <button 
      className="px-3 py-1 rounded bg-white text-white text-sm"
      style={
        {
            boxShadow: '0 8px 6px rgba(0, 0, 0, 0.3)' 
        }
      }
      >
        <span
          className={styles.topbarLink}
          style={
            {
              fontSize: '12px',
              fontWeight: '600'
            }
          }
        >Entrar</span>
      </button>

    </header>
  );
};

export default TopBar;
