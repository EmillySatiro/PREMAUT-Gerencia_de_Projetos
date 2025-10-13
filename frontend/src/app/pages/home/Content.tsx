import React from 'react';
import ShowCards from './ShowCards';
import Somos from './Somos';
import Objetivo from './Objetivo';
import MateriaisApoio from './Materiais_Apoio';

const Content: React.FC = () => {
  return (
    <main>
      <section id="noticias">
        <ShowCards images={['/assets/images/card_1.jpg']} />
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