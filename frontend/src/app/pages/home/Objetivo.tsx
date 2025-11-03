import Colors from '@/app/components/assets/color';
import Icons from '@/app/components/assets/icons';
import Image from '@/app/components/assets/images';
import React from 'react';

export const Objetivo: React.FC = () => {

    const atividades: { urlImage: string; topic: string; description: string }[] = [
        {
            urlImage: Icons.cavalo,
            topic: 'Atividades de leitura, escrita e matemática adaptadas',
            description: 'Jogos pedagógicos que estimulam atenção, memória e raciocínio.',
        },
        {
            urlImage: Icons.cavalo,
            topic: 'Atividades de leitura, escrita e matemática adaptadas',
            description: 'Jogos pedagógicos que estimulam atenção, memória e raciocínio.',
        },
        {
            urlImage: Icons.cavalo,
            topic: 'Atividades de leitura, escrita e matemática adaptadas',
            description: 'Jogos pedagógicos que estimulam atenção, memória e raciocínio.',
        },
        {
            urlImage: Icons.cavalo,
            topic: 'Atividades de leitura, escrita e matemática adaptadas',
            description: 'Jogos pedagógicos que estimulam atenção, memória e raciocínio.',
        },
    ];

    const listItems = (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl lg:max-w-none"
            style={{
                fontFamily: 'Afacad',
                lineHeight: 1.6,
            }}
        >
            {atividades.map((item, idx) => (
                <div
                    key={idx}
                    className="flex flex-col rounded-lg p-4 shadow-md bg-white transition-transform duration-200 hover:translate-x-1 hover:translate-y-1 lg:hover:translate-x-2 lg:hover:translate-y-4"
                >
                    <div
                        className='w-12 h-12 rounded-full flex items-center justify-center mb-3'
                        style={{ backgroundColor: Colors.verdeBase }}
                    >
                        <img src={item.urlImage} alt="" className="w-6 h-6" />
                    </div>
                    <span
                        className="font-bold mb-2"
                        style={{
                            fontSize: 'clamp(14px, 2.5vw, 16px)',
                            color: '#000',
                            lineHeight: '1.4'
                        }}
                    >
                        {item.topic}
                    </span>
                    <p style={{
                        fontSize: 'clamp(12px, 2vw, 14px)',
                        color: 'rgba(0,0,0,0.7)',
                        lineHeight: '1.5'
                    }}>{item.description}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-8 lg:py-16 px-4 sm:px-8 lg:px-10'>
            {/* Seção de texto */}
            <div className='flex flex-col items-start justify-center w-full lg:w-1/2 max-w-2xl'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-6'>
                    <h2
                        className="text-2xl lg:text-4xl font-bold mb-4 sm:mb-0"
                        style={{
                            fontFamily: 'Afacad, sans-serif',
                            fontSize: 'clamp(28px, 5vw, 40px)',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '1.2',
                        }}
                    >O que fazemos no <br className="hidden sm:block" /> PREMAUT?</h2>
                    <img
                        src={Image.coracaoRodolfo}
                        alt="Coracao Rodolfo"
                        className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto sm:mx-0 sm:ml-4"
                    />
                </div>
                <p
                    className="text-justify max-w-full mb-6"
                    style={{
                        fontFamily: 'Afacad, sans-serif',
                        fontSize: 'clamp(16px, 3vw, 24px)',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '1.5',
                        color: 'rgba(0,0,0,0.8)'
                    }}
                >
                    Como o PREMAUT é um projeto de apoio a pessoas com autismo, as atividades podem ser adaptadas para trabalhar aspectos educacionais, sociais, emocionais e de integração comunitária. Aqui vai uma lista de sugestões que você pode usar ou ajustar conforme a proposta do projeto:
                </p>
                <button
                    type="button"
                    className="px-4 py-3 text-white rounded flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
                    aria-label="Ver todas as atividades"
                    style={{
                        backgroundColor: Colors.verdeBase,
                        minWidth: '180px',
                    }}
                >
                    <span
                        style={{
                            color: '#FFF',
                            fontFamily: 'Afacad, sans-serif',
                            fontSize: 'clamp(14px, 2.5vw, 16px)',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                        }}
                    >
                        Todas as atividades
                    </span>
                    <img src={Icons.mdi_arrow} alt="Flecha" aria-hidden="true" className="w-4 h-4" />
                </button>
            </div>
            
            {/* Seção de atividades */}
            <div className='w-full lg:w-1/2 flex justify-center'>
                {listItems}
            </div>
        </div>
    );
}

export default Objetivo;