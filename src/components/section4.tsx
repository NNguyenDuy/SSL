'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const images = Array.from({ length: 10 }).map(
    (_, i) => `/images/img${i + 1}.png`
);

export const Section4 = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        imageRefs.current.forEach((el) => {
            const initialX = gsap.utils.random(0, window.innerWidth);
            const initialY = gsap.utils.random(0, window.innerHeight);
            const initialZ = gsap.utils.random(-500, 500);
            const duration = 10 + Math.random() * 10;

            gsap.set(el, {
                x: initialX,
                y: initialY,
                z: initialZ,
                scale: gsap.utils.random(0.6, 1.2),
                rotationX: gsap.utils.random(0, 360),
                rotationY: gsap.utils.random(0, 360),
                rotationZ: gsap.utils.random(0, 360),
            });

            gsap.to(el, {
                duration,
                x: '+=random(-500, 500)',
                y: '+=random(-300, 300)',
                z: '+=random(-200, 200)',
                rotationX: '+=360',
                rotationY: '+=360',
                rotationZ: '+=180',
                scale: `+=random(-0.2, 0.2)`,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });

            gsap.to(el, {
                boxShadow: '0px 0px 60px rgba(255,0,120,0.6)',
                repeat: -1,
                yoyo: true,
                duration: 2 + Math.random() * 2,
                ease: 'sine.inOut',
            });
        });
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden text-white">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm z-0"
            >
                <source src="/audio/sexy3.mp4" type="video/mp4" />
            </video>

            <div
                ref={containerRef}
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    perspective: '1600px',
                    transformStyle: 'preserve-3d',
                }}
            >
                {images.map((src, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            if (el) imageRefs.current[i] = el;
                        }}
                        className="absolute rounded-xl overflow-hidden border border-pink-500/20 shadow-[0_0_60px_rgba(255,0,120,0.3)] hover:scale-125 transition-transform duration-300 ease-in-out pointer-events-auto backdrop-blur-sm"
                        style={{
                            width: `${140 + Math.random() * 80}px`,
                            height: `${90 + Math.random() * 60}px`,
                            transformStyle: 'preserve-3d',
                            background: 'black',
                        }}
                    >
                        <Image
                            src={src}
                            alt={`Flyer-${i}`}
                            className="w-full h-full object-cover"
                            fill
                            loading='lazy'
                        />
                    </div>
                ))}
            </div>

            <div className="absolute top-10 w-full text-center text-pink-500 text-sm font-mono tracking-widest animate-pulse z-20">
                SEXYGIRL
            </div>
        </section>
    );
};

export default Section4;
