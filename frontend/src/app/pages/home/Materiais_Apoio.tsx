"use client";

import Colors from '@/app/components/assets/color';
import React from 'react';

import Image from '@/app/components/assets/images';

export const MateriaisApoio: React.FC = () => {

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

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const dotsRef = React.useRef<HTMLDivElement | null>(null);
    const draggingRef = React.useRef(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const positionsRef = React.useRef<number[]>([]);

    const scrollToIndex = React.useCallback((index: number, smooth = true) => {
        const el = containerRef.current;
        if (!el) return;
        const children = el.children;
        if (!children || !children[index]) return;
        // use precomputed positions when available to avoid rounding/center issues
        const pos = positionsRef.current && positionsRef.current[index];
        const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);
        let left: number;
        if (typeof pos === 'number') {
            left = Math.min(maxLeft, Math.max(0, pos));
        } else {
            const child = children[index] as HTMLElement;
            left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
            left = Math.min(maxLeft, Math.max(0, left));
        }
        el.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
        // immediately reflect active index so the dot highlights even while smooth scrolling
        setActiveIndex(index);
    }, []);

    // update activeIndex based on scroll - center-based detection
    React.useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const children = el.children;
                if (!children || children.length === 0) return;
                const center = el.scrollLeft + el.clientWidth / 2;
                let closest = 0;
                let minDiff = Infinity;
                for (let i = 0; i < children.length; i++) {
                    const c = children[i] as HTMLElement;
                    const childCenter = c.offsetLeft + c.offsetWidth / 2;
                    const diff = Math.abs(childCenter - center);
                    if (diff < minDiff) {
                        minDiff = diff;
                        closest = i;
                    }
                }
                setActiveIndex(closest);
            });
        };
        el.addEventListener('scroll', onScroll, { passive: true });
        // initial sync
        onScroll();
        return () => {
            el.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(raf);
        };
    }, [livros.length]);

    // Determine index by finding the nearest dot center to the pointer X
    const getIndexFromPointer = React.useCallback((clientX: number) => {
        const dots = dotsRef.current;
        if (!dots) return 0;
        const children = Array.from(dots.children) as HTMLElement[];
        if (children.length === 0) return 0;
        let closest = 0;
        let minDiff = Infinity;
        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            const rect = c.getBoundingClientRect();
            const center = rect.left + rect.width / 2;
            const diff = Math.abs(center - clientX);
            if (diff < minDiff) {
                minDiff = diff;
                closest = i;
            }
        }
        return closest;
    }, []);

    // Precompute left scroll positions for each child so we can scroll precisely
    React.useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const computePositions = () => {
            const children = Array.from(el.children) as HTMLElement[];
            const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);
            const positions = children.map((child) => {
                const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
                return Math.min(maxLeft, Math.max(0, left));
            });
            positionsRef.current = positions;
        };

        computePositions();

        const handleResize = () => {
            computePositions();
            // keep activeIndex consistent after recompute
            if (typeof activeIndex === 'number') {
                const pos = positionsRef.current[activeIndex] ?? 0;
                el.scrollTo({ left: pos, behavior: 'auto' });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [livros.length, activeIndex]);

    // click handler for dots that enforces explicit edge scrolls for first/last
    const handleDotClick = (index: number) => {
        const el = containerRef.current;
        if (!el) return;
        const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);
        if (index === 0) {
            el.scrollTo({ left: 0, behavior: 'smooth' });
            setActiveIndex(0);
            return;
        }
        if (index === livros.length - 1) {
            el.scrollTo({ left: maxLeft, behavior: 'smooth' });
            setActiveIndex(livros.length - 1);
            return;
        }
        scrollToIndex(index, true);
    };

    const handlePointerDown = React.useCallback((e: React.PointerEvent) => {
        const target = e.currentTarget as Element;
        try { target.setPointerCapture(e.pointerId); } catch { }
        draggingRef.current = true;
        setIsDragging(true);
        const idx = getIndexFromPointer(e.clientX);
        scrollToIndex(idx);
    }, [getIndexFromPointer, scrollToIndex]);

    const handlePointerMove = React.useCallback((e: React.PointerEvent) => {
        if (!draggingRef.current) return;
        const idx = getIndexFromPointer(e.clientX);
        scrollToIndex(idx);
    }, [getIndexFromPointer, scrollToIndex]);

    const handlePointerUp = React.useCallback((e: React.PointerEvent) => {
        const target = e.currentTarget as Element;
        try { target.releasePointerCapture(e.pointerId); } catch { }
        draggingRef.current = false;
        setIsDragging(false);
    }, []);

    const listItems = (
        <div
            ref={containerRef}
            className="flex flex-row flex-nowrap overflow-x-auto w-full max-w-4xl gap-4 no-scrollbar"
            style={{
                fontFamily: 'Afacad',
                lineHeight: 1.6,
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory',
                cursor: isDragging ? 'grabbing' : 'grab',
            }}
        >
            {livros.map((item, idx) => (
                <div
                    key={idx}
                    className="flex-shrink-0 flex flex-col rounded-lg shadow-md overflow-hidden bg-white"
                    style={{
                        width: '100%',
                        maxWidth: '250px',
                        maxHeight: '400px',
                        height: '100%',
                        scrollSnapAlign: 'center',
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
                                    {(item.qtdPag.match(/\d+/)?.[0]) ?? item.qtdPag} páginas
                                </span>
                            </div>
                        </div>
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
                            {item.name}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );

    const paginationDots = (
        <div className="w-full flex items-center justify-center mt-4">
            <div
                ref={dotsRef}
                className="flex items-center gap-2 px-3 py-2"
                style={{ touchAction: 'none' }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {livros.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => handleDotClick(i)}
                        role="button"
                        aria-label={`Ir para livro ${i + 1}`}
                        style={{
                            width: 14,
                            height: 14,
                            padding: 6,
                            borderRadius: 999,
                            backgroundColor: i === activeIndex ? '#5d5d5d' : '#e2e2e2',
                            cursor: isDragging ? 'grabbing' : 'pointer',
                            outline: 'none',
                        }}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div
            className='flex flex-col items-center justify-center px-10 py-8'
            style={
                {
                    backgroundImage: `url(${Image.fundoGirassol})`,
                    backgroundSize: 'cover',
                    backgroundColor: 'rgba(211,211,211,0.9)',
                    backgroundBlendMode: 'overlay',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: 'auto',
                }
            }
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
                        style={
                            {
                                fontSize: '20px',
                                fontWeight: 400,
                            }
                        }
                    >
                        Livros, PDFs, artigos e outros materiais de apoio que podem ajudar você.
                    </p>
                </div>
                <button
                    type="button"
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
            {listItems}
            {paginationDots}
        </div>
    );
}

export default MateriaisApoio;