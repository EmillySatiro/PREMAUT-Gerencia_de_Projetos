
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
            className="show-cards"
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
            }}
        >
            {showControls && (
                <button
                    type="button"
                    onClick={prev}
                    aria-label="Voltar"
                    style={{
                        position: 'absolute',
                        left: 8,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 8,
                    }}
                >
                    <img
                        src={Icons.voltar}
                        alt="Voltar"
                        style={{
                            width: 32,
                            height: 32,
                            display: 'block',
                            // drop-shadow segue o contorno do SVG, criando uma sombra "embaixo" que acompanha o desenho
                            filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.80))',
                        }}
                    />
                </button>
            )}

            <img
                src={images[index]}
                alt={`imagem-${index}`}
                className='px-4 py-2 rounded-lg shadow-lg'
                style={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'cover' 
                }}
            />

            {showControls && (
                <button
                    type="button"
                    onClick={next}
                    aria-label="Avançar"
                    style={{
                        position: 'absolute',
                        right: 8,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={Icons.avancar}
                        alt="Avancar"
                        style={{
                            width: 32,
                            height: 32,
                            display: 'block',
                            // drop-shadow segue o contorno do SVG, criando uma sombra "embaixo" que acompanha o desenho
                            filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.80))',
                        }}
                    />
                </button>
            )}
        </div>
    );
}

export default ShowCards;