'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState({
        x: 0,
        y: 0,
        clicking: false,
        isVisible: false,
        isHovering: false,
    });
    
    const positionRef = useRef({ x: 0, y: 0 });
    const isVisibleRef = useRef(false);
    const clickingRef = useRef(false);
    const isHoveringRef = useRef(false);
    const rafRef = useRef<number | null>(null);
    
    const updateStateFromRefs = () => {
        setState({
            x: positionRef.current.x,
            y: positionRef.current.y,
            clicking: clickingRef.current,
            isVisible: isVisibleRef.current,
            isHovering: isHoveringRef.current,
        });
    };
    
    useEffect(() => {
        const throttledRender = () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(() => {
                    updateStateFromRefs();
                    rafRef.current = null;
                });
            }
        };
        
        const updatePosition = (e: MouseEvent) => {
            positionRef.current = { x: e.clientX, y: e.clientY };
            isVisibleRef.current = true;
            throttledRender();
        };
        
        const handleMouseDown = () => {
            clickingRef.current = true;
            throttledRender();
        };

        const handleMouseUp = () => {
            clickingRef.current = false;
            throttledRender();
        };

        const handleMouseLeave = () => {
            isVisibleRef.current = false;
            throttledRender();
        };

        const handleMouseEnter = () => {
            isVisibleRef.current = true;
            throttledRender();
        };

        let hoverDebounceTimer: NodeJS.Timeout;
        const handleElementHover = (e: MouseEvent) => {
            clearTimeout(hoverDebounceTimer);
            hoverDebounceTimer = setTimeout(() => {
                const target = e.target as HTMLElement;
                const isClickable =
                    target.tagName.toLowerCase() === 'a' ||
                    target.tagName.toLowerCase() === 'button' ||
                    target.tagName.toLowerCase() === 'input' ||
                    (target.hasAttribute('role') &&
                        target.getAttribute('role') === 'button') ||
                    target.classList.contains('clickable');
                    
                isHoveringRef.current = isClickable;
                throttledRender();
            }, 50);
        };

        document.addEventListener('mousemove', updatePosition, { passive: true });
        document.addEventListener('mousedown', handleMouseDown, { passive: true });
        document.addEventListener('mouseup', handleMouseUp, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseover', handleElementHover, { passive: true });

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            clearTimeout(hoverDebounceTimer);
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseover', handleElementHover);
        };
    }, []);

    const cursorClass = useMemo(() => {
        return `custom-cursor ${state.clicking ? 'clicking' : ''} ${
            state.isHovering ? 'hovering' : ''
        }`;
    }, [state.clicking, state.isHovering]);

    const cursorStyle = useMemo(() => {
        return {
            transform: `translate(${state.x}px, ${state.y}px) ${
                state.isHovering ? 'scale(1.5)' : 'scale(1)'
            }`,
            opacity: state.isVisible ? 1 : 0,
            width: state.isHovering ? '30px' : '20px',
            height: state.isHovering ? '30px' : '20px',
            willChange: 'transform, opacity, width, height',
            position: 'fixed' as const,
            top: 0,
            left: 0,
            pointerEvents: 'none' as const,
            zIndex: 9999,
            marginTop: '-10px',
            marginLeft: '-10px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(2px)',
            mixBlendMode: 'difference' as const,
            transition: 'opacity 0.3s ease, width 0.2s ease, height 0.2s ease',
        };
    }, [state]);

    return <div ref={cursorRef} className={cursorClass} style={cursorStyle} />;
};
