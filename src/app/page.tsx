'use client';

import { Section1, Section2 } from '@/components';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Section3 = dynamic(
    () => import('@/components').then((mod) => mod.Section3),
    {
        ssr: false,
        loading: () => <div className="min-h-[50vh]" />,
    }
);

export default function Home() {
    const smoothWrapper = useRef(null);
    const smoothContent = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        const smoother = ScrollSmoother.create({
            wrapper: smoothWrapper.current,
            content: smoothContent.current,
            smooth: 1.5,
            effects: true,
            normalizeScroll: true,
            ignoreMobileResize: true,
        });

        gsap.fromTo(
            '.hero',
            { y: 0, opacity: 1 },
            {
                y: '-30%',
                opacity: 0.2,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.2,
                    pin: false,
                },
            }
        );

        gsap.fromTo(
            '.hero h1',
            { scale: 1, filter: 'blur(0px)' },
            {
                scale: 0.8,
                filter: 'blur(5px)',
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            }
        );

        gsap.fromTo(
            '.stick',
            {
                y: '15%',
                opacity: 0,
                scale: 0.95,
            },
            {
                y: '0%',
                opacity: 1,
                scale: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.stick',
                    start: 'top bottom',
                    end: 'top center',
                    scrub: 1,
                },
            }
        );

        gsap.fromTo(
            '.end',
            {
                y: '25%',
                opacity: 0,
                scale: 0.95,
            },
            {
                y: '0%',
                opacity: 1,
                scale: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.end',
                    start: 'top bottom',
                    end: 'top center',
                    scrub: 1,
                },
            }
        );

        return () => {
            smoother.kill();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <div ref={smoothWrapper} className="smooth-wrapper">
            <div ref={smoothContent} className="smooth-content">
                <Section1 />
                <div className="relative z-10">
                    <div className="absolute left-0 right-0 top-0 h-32 z-10 pointer-events-none"></div>
                    <Section2 />
                </div>
                <Suspense fallback={<div className="min-h-[50vh]" />}>
                    <Section3 />
                </Suspense>
            </div>
        </div>
    );
}
