
'use client';

import Icons from '@/app/components/assets/icons';
import React from 'react';

export type ShowCardsProps = { images?: string[] };

export const ShowCards: React.FC<ShowCardsProps> = ({ images = [] }) => {
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        if (images.length === 0) {
            setIndex(0);
            return;
        }
        if (index >= images.length) {
            setIndex(0);
        }
    }, [images, index]);

    if (images.length === 0) return <div>Nenhuma imagem</div>;

    const showControls = images.length > 1;
    const prev = () => setIndex(i => (images.length ? (i - 1 + images.length) % images.length : 0));
    const next = () => setIndex(i => (images.length ? (i + 1) % images.length : 0));

    return (
        <div
            className="show-cards relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                minHeight: '300px',
            }}
        >
            {showControls && (
                <button
                    type="button"
                    onClick={prev}
                    aria-label="Voltar"
                    className="absolute left-2 sm:left-4 lg:left-8 z-10 p-2 hover:scale-110 transition-transform"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={Icons.voltar}
                        alt="Voltar"
                        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                        style={{
                            display: 'block',
                            filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.80))',
                        }}
                    />
                </button>
            )}

            <div className="w-full max-w-4xl mx-auto">
                <img
                    src={images[index]}
                    alt={`imagem-${index}`}
                    className='w-full h-auto rounded-lg shadow-lg'
                    style={{ 
                        objectFit: 'cover',
                        maxHeight: '60vh',
                    }}
                />
            </div>

            {showControls && (
                <button
                    type="button"
                    onClick={next}
                    aria-label="Avançar"
                    className="absolute right-2 sm:right-4 lg:right-8 z-10 p-2 hover:scale-110 transition-transform"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={Icons.avancar}
                        alt="Avancar"
                        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                        style={{
                            display: 'block',
                            filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.80))',
                        }}
                    />
                </button>
            )}

            {/* Indicators for multiple images */}
            {showControls && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                                i === index ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-label={`Ir para imagem ${i + 1}`}
                            style={{
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ShowCards;