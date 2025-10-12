import React from 'react';
import { Feature } from './types';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import Content from './Content';

export default function HomePage() {
  return (
    <main>
    <TopBar />
    <Content />
    <BottomBar />
    </main>
  );
}
