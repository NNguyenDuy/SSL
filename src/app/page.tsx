"use client";

import { Section1 } from "@/components";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Section4 from "@/components/section4";

const Section3 = dynamic(
  () => import("@/components").then((mod) => mod.Section3),
  { ssr: false, loading: () => <div className="min-h-[50vh]" /> }
);

export default function Home() {
  const smoothWrapper = useRef<HTMLDivElement>(null);
  const smoothContent = useRef<HTMLDivElement>(null);

  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceName, setVoiceName] = useState<string>("-");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastSpokenIdx = useRef<number>(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const smoother = ScrollSmoother.create({
      wrapper: smoothWrapper.current!,
      content: smoothContent.current!,
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });
    gsap.fromTo(
      ".hero",
      { y: 0, opacity: 1 },
      {
        y: "-30%",
        opacity: 0.2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );
    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    const secs = Array.from(
      document.querySelectorAll<HTMLElement>(".c-section")
    );
    setSections(secs);

    const cb: IntersectionObserverCallback = (entries) => {
      entries.forEach((ent) => {
        if (!ent.isIntersecting) return;
        const idx = secs.indexOf(ent.target as HTMLElement);
        if (idx === -1 || idx === currentIdx) return;

        goToSection(idx);

        if (isPlaying && idx !== lastSpokenIdx.current) {
          window.speechSynthesis.cancel();
          speakSection(secs[idx], idx);
        }
      });
    };

    const obs = new IntersectionObserver(cb, { threshold: 0.6 });
    secs.forEach((s) => obs.observe(s));
    observerRef.current = obs;
    return () => obs.disconnect();
  }, [currentIdx, isPlaying]);

  const goToSection = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, sections.length - 1));
    setCurrentIdx(clamped);
    const sec = sections[clamped];
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
    setVoiceName(sec.dataset.voice || "-");
  };

  const speakSection = (sec: HTMLElement, idx: number) => {
    if (utteranceRef.current) window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(sec.innerText);
    const match = window.speechSynthesis
      .getVoices()
      .find((v) => v.name.includes(sec.dataset.voice || ""));
    if (match) utt.voice = match;
    utteranceRef.current = utt;
    lastSpokenIdx.current = idx;
    window.speechSynthesis.speak(utt);
  };

  const detectCurrentSection = (): number => {
    const vh = window.innerHeight;
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top >= 0 && rect.top < vh * 0.3) return i;
    }
    return 0;
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      const idx = detectCurrentSection();
      goToSection(idx);
      speakSection(sections[idx], idx);
      setIsPlaying(true);
    } else {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    const prev = Math.max(currentIdx - 1, 0);
    goToSection(prev);
    if (isPlaying && prev !== lastSpokenIdx.current) {
      window.speechSynthesis.cancel();
      speakSection(sections[prev], prev);
    }
  };

  const handleNext = () => {
    const next = Math.min(currentIdx + 1, sections.length - 1);
    goToSection(next);
    if (isPlaying && next !== lastSpokenIdx.current) {
      window.speechSynthesis.cancel();
      speakSection(sections[next], next);
    }
  };

  return (
    <div ref={smoothWrapper} className="smooth-wrapper">
      <div ref={smoothContent} className="smooth-content">
        <section className="c-section" data-voice="Alice">
          <Section1 />
        </section>

        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <section className="c-section" data-voice="Charlie">
            <Section3 />
          </section>
        </Suspense>

        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <section className="c-section" data-voice="Dave">
            <Section4 />
          </section>
        </Suspense>

        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
                        bg-gray-800 bg-opacity-90 text-white 
                        flex items-center space-x-4 px-4 py-2 
                        rounded-full shadow-lg z-50"
        >
          <button
            onClick={handlePrev}
            className="p-2 hover:bg-gray-700 rounded-full transition"
            aria-label="Previous"
          >
            ⏮
          </button>

          <div className="relative">
            {isPlaying && (
              <span className="absolute inset-0 animate-ping rounded-full bg-white opacity-20"></span>
            )}
            <button
              onClick={handlePlayPause}
              className="relative z-10 p-3 bg-white text-gray-800 rounded-full 
                         shadow-lg hover:scale-105 transform transition"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>
          </div>

          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-700 rounded-full transition"
            aria-label="Next"
          >
            ⏭
          </button>

          <span className="ml-2 text-sm font-medium">{voiceName}</span>
        </div>
      </div>
    </div>
  );
}
