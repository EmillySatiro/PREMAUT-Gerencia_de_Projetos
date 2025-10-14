import React from 'react';
import TopBar from '../../components/TopBar';
import BottomBar from './BottomBar';
import Content from './Content';

export default function HomePage() {
  return (
    <main>
    <TopBar background_image="/assets/images/fundo_top_bottom.png"/>
    <Content />
    <BottomBar />
    </main>
  );
}
