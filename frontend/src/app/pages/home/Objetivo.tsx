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
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl"
            style={
                {
                    fontFamily: 'Afacad',
                    lineHeight: 1.6,
                    width: '50%',
                    height: '500px',
                }
            }
        >
            {atividades.map((item, idx) => (
                <div key={idx} className="flex flex-col rounded-lg p-4 shadow-md m-2">
                    <div
                        className='w-12 h-12 rounded-full flex items-center justify-center mb-2'
                        style={{ backgroundColor: Colors.verdeBase }}
                    >
                        <img src={item.urlImage} alt="" />
                    </div>
                    <span
                        className="font-bold"
                        style={{
                            fontSize: '12px',
                            color: '#000'
                        }}
                    >
                        {item.topic}
                    </span>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>);

    return (
        <div
            className='flex flex-row items-center justify-center my-16 px-10'
        >
            <div
                className='flex flex-col items-start justify-center mr-8'
                style={{
                    width: '50%',
                    height:'500px'
                }}>
                <div 
                    className='flex flex-row justify-between items-center'
                    style={{ width: '100%' }}
                >
                    <h2
                        className="text-2xl font-bold"
                        style={{
                            fontFamily: 'Afacad, sans-serif',
                            fontSize: '40px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                        }}
                    >O que fazemos no <br/> PREMAUT?</h2>
                    <img
                        src={Image.coracaoRodolfo}
                        alt="Coracao Rodolfo"
                        className="w-40 h-40 ml-4"
                    />
                </div>
                <p
                    className="text-justify max-w-4xl my-4"
                    style={{
                        fontFamily: 'Afacad, sans-serif',
                        fontSize: '26px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                    }}
                >
                    Como o PREMAUT é um projeto de apoio a pessoas com autismo, as atividades podem ser adaptadas para trabalhar aspectos educacionais, sociais, emocionais e de integração comunitária. Aqui vai uma lista de sugestões que você pode usar ou ajustar conforme a proposta do projeto:
                </p>
                <button
                    type="button"
                    className="px-2 py-2 text-white rounded flex items-center gap-2"
                    aria-label="Ver todas as atividades"
                    style={{
                        backgroundColor: Colors.verdeBase,
                        width: '140px',
                    }}
                >
                    <span
                        style={{
                            color: '#FFF',
                            fontFamily: 'Afacad, sans-serif',
                            fontSize: '12px',
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
            {listItems}
        </div>
    );
}

export default Objetivo;