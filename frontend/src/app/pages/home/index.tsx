import React from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import Content from './Content';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Seção inicial com id para âncora */}
      <section id="inicio">
        <TopBar/>
      </section>
      
      {/* Conteúdo principal */}
      <Content />
      
      {/* Rodapé */}
      <BottomBar />
    </main>
  );
}
