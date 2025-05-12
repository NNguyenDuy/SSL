'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export const Section3 = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const lightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current!;
        const image = imageRef.current!;
        const light = lightRef.current!;

        const handleMouseMove = (e: MouseEvent) => {
            const bounds = container.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            const percentX = x / bounds.width - 0.5;
            const percentY = y / bounds.height - 0.5;

            gsap.to(image, {
                rotateY: percentX * 30,
                rotateX: -percentY * 30,
                scale: 1.05,
                duration: 0.4,
                ease: 'power3.out',
            });

            gsap.to(light, {
                x: percentX * 100,
                y: percentY * 100,
                opacity: 0.6,
                duration: 0.4,
            });
        };

        const reset = () => {
            gsap.to(image, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.4)',
            });
            gsap.to(light, { opacity: 0, duration: 0.4 });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', reset);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', reset);
        };
    }, []);

    return (
        <section className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-radial from-[#240000] via-[#120000] to-black text-white">
            <div className="absolute w-[700px] h-[700px] rounded-full blur-[150px] bg-pink-500/20 shadow-[0_0_200px_60px_rgba(255,0,120,0.4)] z-0"></div>

            <div className="absolute w-[550px] h-[550px] border border-pink-500/20 rounded-full animate-spin-slow z-0" />

            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white/20 blur-[2px] animate-float z-0"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${3 + Math.random() * 5}s`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}

            <div
                ref={containerRef}
                className="relative w-[500px] h-[700px] rounded-xl shadow-[0_0_60px_10px_rgba(255,0,120,0.3)] z-10 overflow-hidden"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
                <div
                    ref={lightRef}
                    className="absolute top-0 left-0 w-full h-full bg-white pointer-events-none rounded-xl mix-blend-overlay opacity-0"
                />

                <div
                    ref={imageRef}
                    className="w-full h-full rounded-xl overflow-hidden"
                    style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center center',
                    }}
                >
                    <Image
                        src="/images/img5.png"
                        alt="3D Art"
                        className="w-full h-full object-cover"
                        fill
                        loading="lazy"
                    />
                </div>
            </div>

            <div className="absolute bottom-10 text-white text-center text-lg font-mono opacity-60 z-20">
                Explore the silhouette in motion.
            </div>
        </section>
    );
};

export default Section3;
