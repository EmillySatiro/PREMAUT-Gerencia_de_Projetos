import React from 'react';
import Image from 'next/image';

export const TopBar: React.FC = () => {
  const topbarLink = "text-gray-800 hover:text-gray-600 px-2";

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between h-16 px-6"
      style={{
        backgroundImage: "url('/assets/images/fundo_top_bottom.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(246, 244, 240,0.8)',
      }}
    >
      <div className="flex items-center space-x-1">
        <Image src="/assets/images/solar_heart-broken.svg" alt="Coração" width={40} height={40} />
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
          <a href="/" className={topbarLink}>Inicio</a>
          <a href="#noticias" className={topbarLink}>Noticias</a>
          <a href="#sobre" className={topbarLink}>Sobre</a>
          <a href="/pages/screen-admin" className={topbarLink}>Painel</a>
        </nav>
      </div>
      <a
        href="/pages/login"
        className="px-3 py-1 rounded bg-white text-sm"
        style={{ boxShadow: '0 8px 6px rgba(0, 0, 0, 0.3)' }}
      >
        <span
          className={topbarLink}
          style={{ fontSize: '12px', fontWeight: 600 }}
        >
          Entrar
        </span>
      </a>

    </header>
  );
};

export default TopBar;
