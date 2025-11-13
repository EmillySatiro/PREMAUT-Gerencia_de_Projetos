

'use client';

import Icons from '@/app/components/assets/icons';
import React from 'react';

import Image from '@/app/components/assets/images';

export const Somos: React.FC = () => {
    const items: { topic: string; value: string }[] = [
        {
            topic: 'Funcionários',
            value: '10+',
        },
        {
            topic: 'Pacientes',
            value: '100+',
        },
        {
            topic: 'Anos',
            value: '7+',
        },
        {
            topic: 'Alguma coisa',
            value: '12+',
        },
    ];

    const listItems = (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:flex md:justify-between gap-4 w-full mt-4"
            style={
                {
                    fontFamily: 'Afacad',
                    lineHeight: 1.6,
                    color: 'rgba(0,0,0,0.53)',
                }
            }
        >
            {items.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                    <span
                        className="font-bold"
                        style={{
                            fontFamily: 'Afacad',
                            fontSize: '22px',
                            color: '#000'
                        }}
                    >
                        {item.value}
                    </span>
                    <p
                        style={
                            {
                                fontSize: '22px'
                            }
                        }
                    >{item.topic}</p>
                </div>
            ))}
        </div>);

    return (
        <div
            className='flex flex-col items-center space-y-4 py-8 px-4 sm:px-8 lg:px-16 xl:px-20'
            style={{
                backgroundImage: `url(${Image.fundoSomos})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'rgba(211,211,211,0.9)',
                backgroundBlendMode: 'overlay',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="w-full mx-auto">
                <div className="flex items-center mb-4">
                    <img src={Icons.estrela} alt="Estrela" className="h-5 w-5 sm:h-6 sm:w-6 object-contain mr-2" />
                    <p className="text-left font-bold" style={{ fontFamily: 'Afacad', fontSize: '18px', color: '#000' }}>
                        Somos
                    </p>
                </div>
                <h1 className='text-justify mb-6'
                    style={{
                        fontFamily: 'Afacad',
                        fontSize: 'clamp(18px, 4vw, 26px)',
                        lineHeight: '1.6',
                        color: 'rgba(0, 0, 0, 0.53)'
                    }}>
                    <strong
                        style={{
                            fontFamily: 'Afacad',
                            fontSize: 'clamp(18px, 4vw, 26px)',
                            lineHeight: '1.6',
                            color: '#000'
                        }}>O PREMAUT é um projeto inovador voltado para o apoio e a inclusão de pessoas com autismo. Seu objetivo principal é promover o desenvolvimento de habilidades sociais, educacionais e emocionais</strong>, oferecendo recursos acessíveis que auxiliam tanto no cotidiano quanto na construção de uma vida mais autônoma e participativa.
                </h1>
                {listItems}
            </div>
        </div>
    );
}

export default Somos;