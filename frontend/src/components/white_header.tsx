"use client";
import Image from "next/image";

export default function WhiteHeader() {
  return (
      <header className="w-full flex justify-between items-center px-10 py-10 bg-gradient-to-b from-[#fff9f7] to-[#fffdfc] shadow-sm">
      {/* Logo à esquerda */}
      <div className="flex items-center gap-2">
        <Image
          src="/assets/images/solar_heart-broken.png"
          alt="Coração Prematuro"
          width={30}
          height={30}
          priority
        />
        <Image
          src="/assets/images/PREMAUT.png"
          alt="PREMAUT"
          width={100}
          height={24}
          priority
        />
      </div>

      {/* Ícone de menu à direita */}
      <button
        className="hover:opacity-80 active:scale-95 transition-transform"
        aria-label="Abrir menu"
      >
        <Image
          src="/assets/images/tres_barras.png"
          alt="Menu"
          width={28}
          height={28}
        />
      </button>
    </header>
  );
}
