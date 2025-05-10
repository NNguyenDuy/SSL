'use client';

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Section1 = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
            overlayRef.current,
            { scaleX: 1 },
            { scaleX: 0, transformOrigin: 'left', duration: 1.5 }
        )
            .fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                '-=0.8'
            )
            .fromTo(
                textRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.5'
            )
            .fromTo(
                imageRef.current,
                { opacity: 0, scale: 1.1 },
                { opacity: 1, scale: 1, duration: 1.2 },
                '-=1'
            );

        if (sectionRef.current) {
            gsap.to(imageRef.current, {
                scale: 1.05,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="hero relative flex flex-col md:flex-row min-h-[90vh] bg-gradient-to-br from-black to-red-900 overflow-hidden"
        >
            <div className="absolute inset-0 opacity-10 mix-blend-overlay"></div>
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black transform origin-left"
            ></div>

            <div className="relative z-10 flex-1 flex flex-col justify-center p-8 text-white">
                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"
                >
                    SECRET <span className="text-red-500">SWINGER</span> LUST
                </h1>
                <p
                    ref={textRef}
                    className="text-lg md:text-xl max-w-2xl text-gray-200 leading-relaxed"
                >
                    We are a couple who loves to travel and visit SwingerClubs.
                    We would like to get in touch with other couples when we are
                    traveling and setup a meeting at SwingerClubs and maybe
                    hotel sleepovers.
                </p>

                <div className="mt-8">
                    <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-sm transition-all hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] transform hover:-translate-y-1">
                        Connect With Us
                    </button>
                </div>
            </div>

            <div className="relative flex-1 min-h-[50vh]">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900 to-black opacity-10 z-0"></div>
                <div className="absolute inset-0 opacity-10 mix-blend-overlay z-1"></div>

                <div
                    ref={imageRef}
                    className="absolute w-4/5 h-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                    <div className="absolute inset-0 rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.7)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-transparent mix-blend-multiply z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                        <div className="absolute inset-0 border border-red-800 opacity-40 z-20"></div>

                        <Image
                            src="/images/background1.png"
                            alt="Mysterious woman with red blindfold"
                            fill
                            className="object-contain object-center"
                            priority
                            loading="eager"
                        />
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-red-900 to-transparent opacity-70 z-20"></div>
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-black via-red-900 to-transparent opacity-70 z-20"></div>

                <div className="absolute top-8 right-8 w-16 h-16 border border-red-500 opacity-30 z-20"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border border-red-500 opacity-30 z-20"></div>
            </div>
        </section>
    );
};

export default Section1;
