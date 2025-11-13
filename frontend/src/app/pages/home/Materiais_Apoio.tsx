"use client";


import Colors from '@/app/components/assets/color';
import React from 'react';
import Image from '@/app/components/assets/images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { buscarMateriais } from '@/app/services/materiaisService';
import { Material } from '@/types/material';

export const MateriaisApoio: React.FC = () => {
    const [materiais, setMateriais] = React.useState<Material[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        buscarMateriais()
            .then(data => {
                setMateriais(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div
            className='flex flex-col items-center justify-center px-10 py-8'
            style={{
                backgroundImage: `url(${Image.fundoGirassol})`,
                backgroundSize: 'cover',
                backgroundColor: 'rgba(211,211,211,0.9)',
                backgroundBlendMode: 'overlay',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: 'auto',
            }}
        >
            <div
                className='flex flex-row items-center justify-center mb-8'
                style={{
                    fontFamily: 'Afacad',
                    fontSize: '40px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                }}
            >
                <div className='flex flex-col items-center justify-center mr-8'>
                    <h1
                        className="text-2xl font-bold"
                        style={{
                            fontSize: '40px',
                            fontWeight: 700,
                        }}
                    >
                        Materiais de apoio
                    </h1>
                    <p
                        style={{
                            fontSize: '20px',
                            fontWeight: 400,
                        }}
                    >
                        Livros, PDFs, artigos e outros materiais de apoio que podem ajudar você.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => window.location.href = '/pages/apoio/materiais'}
                    onClick={() => window.location.href = '/pages/apoio/materiais'}
                    style={{
                        borderRadius: 10,
                        border: '3.733px solid #FFF',
                        background: 'rgba(255,255,255,0)',
                        boxShadow: '0 4.977px 4.977px 0 rgba(0,0,0,0.67)',
                        backdropFilter: 'blur(2px)',
                        WebkitBackdropFilter: 'blur(2px)',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        outline: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <span
                        style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#FFF',
                            background: 'transparent'
                        }}
                    >
                        Ver mais
                    </span>
                </button>
            </div>
            <div className="w-full max-w-4xl">
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                    }}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    style={{ paddingBottom: 40 }}
                >
                    {materiais.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className="flex flex-col rounded-lg shadow-md overflow-hidden bg-white"
                                style={{
                                    width: '100%',
                                    maxWidth: '250px',
                                    maxHeight: '400px',
                                    height: '100%',
                                    margin: '0 auto',
                                }}
                            >
                                <div
                                    style={{
                                        height: '80%',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f7f7f7',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        src={item.capa_url}
                                        alt={item.nome}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            display: 'block',
                                        }}
                                    />
                                    {item.qtd_paginas && (
                                        <div
                                            className="absolute items-center pointer-events-none z-10"
                                            style={{ top: 20, right: 0 }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 124 34"
                                                className="w-17 h-17"
                                                preserveAspectRatio="xMidYMid meet"
                                            >
                                                <path d="M0.477875 0.685059H123.218V33.8581H0.477875L18.3084 17.2716L0.477875 0.685059Z" fill="#C02828" />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span
                                                    className="text-xs font-bold text-white"
                                                    style={{
                                                        lineHeight: 1,
                                                        fontSize: '11px'
                                                    }}>
                                                    {(item.qtd_paginas.match(/\d+/)?.[0]) ?? item.qtd_paginas} páginas
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    style={{
                                        height: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '12px',
                                        backgroundColor: Colors.verdeBase
                                    }}
                                >
                                    <span
                                        className="font-bold text-sm"
                                        style={{
                                            color: '#FFF',
                                            fontFamily: 'Inria Serif',
                                        }}
                                    >
                                        {item.nome}
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MateriaisApoio;