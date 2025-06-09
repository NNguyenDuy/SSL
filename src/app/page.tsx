"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";

import Section4 from "@/components/section4";
import { Section1, Section3 } from "@/components";

export default function Home() {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      voicesRef.current = synth.getVoices();
      setReady(true);
    };
    synth.addEventListener("voiceschanged", updateVoices);
    updateVoices();
    return () => synth.removeEventListener("voiceschanged", updateVoices);
  }, []);

  const slides = [
    {
      Comp: Section1,
      text: "Welcome to Section Ones!",
      voiceName: "Section One ",
    },
    {
      Comp: Section3,
      text: "Here is Section Sexy Girl.",
      voiceName: "Section Two",
    },
    {
      Comp: Section4,
      text: "Finally, Section Video Sexy Girl",
      voiceName: "Section Three",
    },
  ];

  const swiperRef = useRef<SwiperClass | null>(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const speakText = (text: string, voiceName: string) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    const match = voicesRef.current.find((v) => v.name.includes(voiceName));
    if (match) utt.voice = match;
    utt.rate = 1;
    utt.pitch = 1;
    utt.volume = 1;
    synth.speak(utt);
  };

  const onSlideChange = (sw: SwiperClass) => {
    setIdx(sw.activeIndex);
    if (playing && ready) {
      const { text, voiceName } = slides[sw.activeIndex];
      speakText(text, voiceName);
    }
  };

  const togglePlay = () => {
    if (!ready) return; 
    if (!playing) {
      const { text, voiceName } = slides[idx];
      speakText(text, voiceName);
      setPlaying(true);
    } else {
      window.speechSynthesis.cancel();
      setPlaying(false);
    }
  };

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <div className="relative">
      <Swiper
        onSwiper={(sw) => (swiperRef.current = sw)}
        direction="vertical"
        slidesPerView={1}
        mousewheel
        keyboard
        modules={[Mousewheel, Keyboard]}
        onSlideChange={onSlideChange}
        style={{ height: "100vh" }}
      >
        {slides.map(({ Comp }, i) => (
          <SwiperSlide key={i}>
            <Comp />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2
                      bg-gray-800 bg-opacity-90 text-white
                      flex items-center space-x-4 px-4 py-2
                      rounded-full shadow-lg z-50"
      >
        <button onClick={goPrev} className="p-2 hover:bg-gray-700 rounded-full">
          ⏮
        </button>

        <div className="relative">
          {playing && (
            <span className="absolute inset-0 animate-ping rounded-full bg-white opacity-20" />
          )}
          <button
            onClick={togglePlay}
            className="relative z-10 p-3 bg-white text-gray-800 rounded-full shadow-lg hover:scale-105 transition"
          >
            {playing ? "⏸️" : "▶️"}
          </button>
        </div>

        <button onClick={goNext} className="p-2 hover:bg-gray-700 rounded-full">
          ⏭
        </button>

        <span className="ml-2 text-sm font-medium">
          {slides[idx].voiceName}
        </span>
      </div>
    </div>
  );
}
