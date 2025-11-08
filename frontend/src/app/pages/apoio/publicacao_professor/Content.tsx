"use client";

import Icons from '@/app/components/assets/icons';
import Image from '@/app/components/assets/images';
import Colors from '@/app/components/color';
import React from 'react';

export const MateriaisApoio: React.FC = () => {
    const [search, setSearch] = React.useState('');

    const livros: { urlImage: string; name: string; qtdPag: string }[] = [
        {
            urlImage: Image.capaLivro,
            name: 'Livro de atividades 1',
            qtdPag: '20 páginas',
        },
        {
            urlImage: Image.capaLivro,
            name: 'Livro de atividades 2',
            qtdPag: '15 páginas',
        },
        {
            urlImage: Image.capaLivro,
            name: 'Livro de atividades 3',
            qtdPag: '30 páginas',
        },
        {
            urlImage: Image.capaLivro,
            name: 'Livro de atividades 4',
            qtdPag: '25 páginas',
        },
        {
            urlImage: Image.capaLivro,
            name: 'Livro de atividades 4',
            qtdPag: '25 páginas',
        },
        {
            urlImage: Image.capaLivro,
            name: 'Livro de atividades 4',
            qtdPag: '25 páginas',
        },
        {
            urlImage: Image.capaLivro,
            name: 'Livro de atividades 4',
            qtdPag: '25 páginas',
        },
        {
            urlImage: Image.capaLivro,
            name: 'Livro de atividades 4',
            qtdPag: '25 páginas',
        },
        {
            urlImage: Image.capaLivro,
            name: 'Livro de atividades 4',
            qtdPag: '25 páginas',
        },
    ];

    const filteredLivros = livros.filter(
        livro =>
            livro.name.toLowerCase().includes(search.toLowerCase()) ||
            livro.qtdPag.toLowerCase().includes(search.toLowerCase())
    );

    const getGridColumns = () => {
        if (typeof window !== "undefined") {
            const width = window.innerWidth;
            if (width < 640) return 2;
            if (width < 900) return 3;
            if (width < 1200) return 4;
            if (width < 1500) return 5;
            return 6;
        }
        return 6;
    };

    const [gridColumns, setGridColumns] = React.useState(getGridColumns());

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedLivro, setSelectedLivro] = React.useState<null | { urlImage: string; name: string; qtdPag: string }>(null);

    React.useEffect(() => {
        const handleResize = () => setGridColumns(getGridColumns());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const listItems = filteredLivros.length === 0 ? (
        <div style={{ marginTop: '32px', textAlign: 'center', color: Colors.verdeBase, fontWeight: 'bold' }}>
            Nenhum livro encontrado com o nome "{search}"
        </div>
    ) : (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                gap: '16px',
                justifyItems: 'center',
                marginTop: '24px',
            }}
        >
            {filteredLivros.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        maxWidth: '200px',
                        maxHeight: '350px',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                        borderBottomLeftRadius: '16px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                        overflow: 'hidden',
                        background: 'white',
                        cursor: 'pointer'
                    }}
                    onClick={() => { setSelectedLivro(item); setDialogOpen(true); }}
                >
                    <div
                        style={{
                            flex: 1,
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Colors.verdeBase,
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}
                    >
                        <img
                            src={item.urlImage}
                            alt={item.name}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block',
                            }}
                        />

                        <div
                            className="absolute items-center pointer-events-none z-10"
                            style={{ top: 20, right: 0 }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 124 34"
                                className="w-22 h-17"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <path d="M0.477875 0.685059H123.218V33.8581H0.477875L18.3084 17.2716L0.477875 0.685059Z" fill="#C02828" />
                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span
                                    className="text-xs font-bold text-white"
                                    style={{
                                        lineHeight: 1,
                                        fontSize: '10px'
                                    }}>
                                    {(item.qtdPag.match(/\d+/)?.[0]) ?? item.qtdPag} páginas
                                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            minHeight: '56px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px',
                            backgroundColor: Colors.verdeBase,
                            borderBottomLeftRadius: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        <span
                            className="font-bold text-sm"
                            style={{
                                color: '#FFF',
                                fontFamily: 'Inria Serif',
                            }}
                        >
                            {item.name}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen p-6">
            <div className="flex flex-row items-end justify-end">
                <div
                    style={{
                        position: 'relative',
                        width: '300px',
                        margin: '20px 0'
                    }}>
                    <input
                        type="text"
                        placeholder="Pesquisa"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 45px 12px 20px',
                            borderRadius: '30px',
                            background: 'rgba(255, 255, 255, 0.80)',
                            boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 0.25)',
                            border: 'none',
                            outline: 'none',
                            fontSize: '16px',
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <img src={Icons.lupa} alt="Lupa" className="w-6 h-6" />
                    </span>
                </div>
            </div>
            {listItems}

            {dialogOpen && selectedLivro && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setDialogOpen(false)} />
                    <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', minWidth: '260px', zIndex: 60 }}>
                        <div style={{ marginBottom: '8px', fontWeight: '700' }}>{selectedLivro.name}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button
                                onClick={() => { /* editar action */ setDialogOpen(false); console.log('Editar', selectedLivro); }}
                                onMouseEnter={() => { /* noop */ }}
                                style={{
                                    background: '#fff',
                                    color: '#000',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    border: '1px solid transparent'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = '#ffecec')}
                                onMouseOut={(e) => (e.currentTarget.style.background = '#fff')}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => { setDialogOpen(false); console.log('Excluir', selectedLivro); }}
                                style={{
                                    background: '#fff',
                                    color: '#000',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    border: '1px solid transparent'
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = '#ffecec')}
                                onMouseOut={(e) => (e.currentTarget.style.background = '#fff')}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MateriaisApoio;