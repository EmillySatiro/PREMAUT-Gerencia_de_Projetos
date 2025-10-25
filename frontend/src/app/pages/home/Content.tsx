import React from 'react';
import ShowCards from './ShowCards';
import Somos from './Somos';
import Objetivo from './Objetivo';
import MateriaisApoio from './Materiais_Apoio';
import Image from '@/app/components/assets/images';

const Content: React.FC = () => {
  return (
    <main>
      <section id="noticias">
        <ShowCards images={[Image.card1]} />
      </section>
      <section id="sobre">
        <Somos />
      </section>
      <Objetivo />
      <MateriaisApoio />
    </main>
  );
}

export default Content;