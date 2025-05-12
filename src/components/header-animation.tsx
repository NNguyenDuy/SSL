'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

export const HeaderAnimation = () => {
    const headerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);
    const menuRef = useRef(null);

    useEffect(() => {
        if (menuRef.current) {
            gsap.set(menuRef.current, {
                display: 'block',
                x: isOpen ? '100%' : '0%',
                opacity: isOpen ? 0 : 1,
            });

            if (isOpen) {
                gsap.fromTo(
                    menuRef.current,
                    { x: '100%', opacity: 0 },
                    {
                        x: '0%',
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                    }
                );
            } else {
                gsap.to(menuRef.current, {
                    x: '100%',
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.in',
                });
            }
        }
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50" ref={headerRef}>
            <button
                onClick={toggleMenu}
                className="fixed top-4 right-4 z-50 text-3xl text-red-400 hover:text-red-300 focus:outline-none hover:scale-115 transition-transform duration-200"
                type="button"
                aria-label="Toggle menu"
            >
                <Image
                    src="/images/logo.png"
                    alt="Menu Icon"
                    width={40}
                    height={40}
                    className={`w-10 h-10 ${
                        isOpen ? 'rotate-90' : 'rotate-0'
                    } transition-transform duration-300`}
                />
            </button>

            <div
                ref={menuRef}
                className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-[#1a1a1a] to-red-[#380000] z-40 backdrop-blur-lg shadow-md"
            >
                <nav className="container mx-auto px-6">
                    <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center justify-center md:h-16 p-5 font-semibold">
                        <li>
                            <Link
                                href="/dashboard"
                                className="text-red-200 hover:text-white transition-colors duration-200"
                                onClick={toggleMenu}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/search-swingers"
                                className="text-red-200 hover:text-white transition-colors duration-200"
                                onClick={toggleMenu}
                            >
                                Search Swingers
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/swinger-clubs"
                                className="text-red-200 hover:text-white transition-colors duration-200"
                                onClick={toggleMenu}
                            >
                                Swinger Clubs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/swinger-holiday-destinations"
                                className="text-red-200 hover:text-white transition-colors duration-200"
                                onClick={toggleMenu}
                            >
                                Swinger Holiday Destinations
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/announcements"
                                className="text-red-200 hover:text-white transition-colors duration-200"
                                onClick={toggleMenu}
                            >
                                Announcements
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/swinger-blog"
                                className="text-red-200 hover:text-white transition-colors duration-200"
                                onClick={toggleMenu}
                            >
                                Swinger Blog
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
