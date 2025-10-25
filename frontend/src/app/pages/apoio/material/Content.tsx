"use client";

import Colors from '@/app/components/color';
import React from 'react';

export const MateriaisApoio: React.FC = () => {

    type Livro = {
        nome: string;
        urlDaCapa: string;
        descricao: string;
    };

    const livro: Livro =
    {
        nome: "Meu filho è autista e agora?",
        urlDaCapa: "/assets/images/capa_livro.jpg",
        descricao: "O livro fala sobre o impacto que o diagnóstico de autismo causa em uma família e como os pais podem lidar com essa nova realidade. A autora, que é mãe e professora, mistura conhecimento prático com sua experiência pessoal, trazendo um tom de conversa e acolhimento. ",
    }
        ;

    return (
        <div className="flex flex-col min-h-screen p-4">
            <div className="">
                <a href="/pages/materiais_apoio">
                    <img src="/assets/images/mdi_arrow-up.svg" alt="" className="w-12 h-12" />
                </a>
            </div>
            <div
                className="flex flex-row p-4 m-8 gap-4"
                style={{
                    backgroundColor: Colors.verdeClarinho,
                    padding: '16px',
                    borderRadius: '8px',
                }}
            >
                <img
                    src={livro.urlDaCapa}
                    alt={`Capa de ${livro.nome}`}
                    style={{
                        width: '100px',
                        height: 'auto',
                        borderRadius: '4px',
                    }}
                />
                <div className="flex flex-col justify-center gap-2">
                    <h2
                        style={{
                            color: '#3B3B3B',
                            fontFamily: '"Inria Serif"',
                            fontSize: '24px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                            marginTop: '12px',
                        }}
                    >
                        {livro.nome}
                    </h2>
                    <p
                        style={{
                            color: '#000',
                            fontFamily: '"Inria Serif"',
                            fontSize: '14px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                        }}
                    >
                        {livro.descricao}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MateriaisApoio;