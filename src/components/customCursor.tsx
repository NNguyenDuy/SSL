'use client';

import { useState, useEffect } from 'react';

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicking, setClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const addVisibility = () => {
            setIsVisible(true);
        };

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => {
            setClicking(true);
        };

        const handleMouseUp = () => {
            setClicking(false);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        const handleElementHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'input' ||
                (target.hasAttribute('role') &&
                    target.getAttribute('role') === 'button') ||
                target.hasAttribute('onclick') ||
                target.classList.contains('clickable');

            setIsHovering(isClickable);
        };

        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('mousemove', addVisibility);
        document.addEventListener('mousemove', handleElementHover);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mousemove', addVisibility);
            document.removeEventListener('mousemove', handleElementHover);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    const cursorClass = `custom-cursor ${clicking ? 'clicking' : ''} ${
        isHovering ? 'hovering' : ''
    }`;

    return (
        <div
            className={cursorClass}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                opacity: isVisible ? 1 : 0,
                transform: `translate(-50%, -50%) ${
                    isHovering ? 'scale(1.5)' : 'scale(1)'
                }`,
                width: isHovering ? '30px' : '20px',
                height: isHovering ? '30px' : '20px',
            }}
        />
    );
};
