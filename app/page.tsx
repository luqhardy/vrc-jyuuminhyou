"use client";

import React, { useState, useEffect, useRef } from "react";
import XIcon from "@mui/icons-material/X";
import LanguageIcon from "@mui/icons-material/Language";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { WebHaptics, defaultPatterns } from "web-haptics";

type ValidLanguage = "en" | "ja" | "ms";
type AnimationStage =
  | "initial"
  | "entering"
  | "processing"
  | "done"
  | "fadeout"
  | "language"
  | "profile";

export default function Home() {
  const [stage, setStage] = useState<AnimationStage>("initial");
  const [language, setLanguage] = useState<ValidLanguage | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hapticsRef = useRef<any>(null);

  const profileData: Record<
    ValidLanguage,
    { greeting: string; name: string; intro: string }
  > = {
    en: {
      greeting: "Scan Complete",
      name: "Hardy (luqhardy)",
      intro:
        "Resident of 'Nadenade Matching' since Spring 2026. Trust Level: USER. Self-proclaimed Japanese speaker.",
    },
    ja: {
      greeting: "完了",
      name: "Hardy ハーディ (luqhardy)",
      intro:
        "現住所：なでなでマッチング。2026年春から住民。信頼レベル：USER。自称日本語話者。",
    },
    ms: {
      greeting: "Imbasan Selesai",
      name: "Hardy (luqhardy)",
      intro:
        "Penduduk 'Nadenade Matching' sejak Musim Bunga 2026. Tahap Kepercayaan: USER. Mengaku pandai berbahasa Jepun.",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      hapticsRef.current = new WebHaptics();
    }

    setStage("entering");

    const enterTimer = setTimeout(() => {
      setStage("processing");

      setTimeout(() => {
        setStage("done");

        if (hapticsRef.current) {
          hapticsRef.current.trigger(defaultPatterns.success);
        }

        setTimeout(() => {
          setStage("fadeout");

          setTimeout(() => {
            setStage("language");
          }, 500);
        }, 2000);
      }, 1000);
    }, 1200);

    return () => clearTimeout(enterTimer);
  }, []);

  const handleLanguageSelect = (lang: ValidLanguage) => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((e: Error) => console.log("Audio playback blocked:", e));
    }

    if (hapticsRef.current) {
      hapticsRef.current.trigger();
    }

    setLanguage(lang);
    setStage("profile");
  };

  return (
    <main className="min-h-screen bg-[#f2f2f7] text-black flex flex-col items-center p-6 font-sans overflow-hidden">
      <audio ref={audioRef} src="/ding.mp3" preload="auto" />

      {(stage === "entering" ||
        stage === "processing" ||
        stage === "done" ||
        stage === "fadeout") && (
        <div
          className={`fixed inset-0 flex flex-col items-center justify-start ${stage === "fadeout" ? "animate-element-fade-out" : "animate-element-fade-in"}`}
        >
          {/* Card Image Container */}
{/* Card Image Container */}
          <div
            className={`relative mt-12 px-6 w-full flex justify-center ${stage === "entering" ? "animate-card-slide-down" : ""} ${stage === "processing" ? "animate-card-hold-pulse" : ""}`}
          >
            {/* iOS NameDrop-style Aura/Bloom behind the card */}
            {(stage === "processing" || stage === "entering" || stage === "done") && (
              <div className="absolute top-0 left-0 w-full h-[120%] -z-10 pointer-events-none flex justify-center items-center">
                {/* Huge glowing orb */}
                <div className={`absolute w-[300px] h-[300px] bg-[#007AFF] rounded-full blur-[80px] opacity-20 ${stage === "entering" ? "animate-blob-pulse" : "animate-pulse"}`} />
                <div className="absolute w-[200px] h-[200px] bg-white rounded-full blur-[60px] opacity-30 animate-pulse" style={{ animationDelay: '0.5s'}} />
                
                {/* Sprawling background particles (NameDrop style) */}
                {Array.from({ length: 150 }).map((_, i) => {
                  const size = Math.random() * 2.5 + 1;
                  return (
                    <div
                      key={i}
                      className={`absolute rounded-full animate-namedrop-particle ${i % 4 === 0 ? 'bg-[#007AFF] shadow-[0_0_15px_4px_rgba(0,122,255,0.8)]' : 'bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.9)]'}`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        '--tx': `${(Math.random() - 0.5) * 600}px`,
                        '--ty': `${(Math.random() - 0.5) * 600}px`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${1.5 + Math.random() * 2.5}s`,
                      } as React.CSSProperties}
                    />
                  );
                })}
              </div>
            )}

            <div className="relative w-full max-w-sm rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-white/20 transform-gpu z-10 bg-white/50 backdrop-blur-md">
              {/* Using standard img tag pointing to the public folder */}
              <img
                src="/vrc-card.png"
                alt="VRChat Resident Card"
                className="w-full relative z-10 mix-blend-normal"
              />

              {/* Subtle Holographic Sweep on Card */}
              {(stage === "processing" || stage === "entering") && (
                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-transparent via-white/50 to-transparent -translate-y-full animate-card-shimmer mix-blend-overlay" />
              )}
            </div>
          </div>

          {/* Checkmark Container */}
          {stage === "done" && (
            <div className="flex flex-col items-center mt-16 animate-element-fade-in transition-opacity">
              <svg className="w-20 h-20" viewBox="0 0 52 52">
                <circle
                  className="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="#007AFF"
                  stroke="#007AFF"
                />
                <path
                  className="checkmark-check"
                  fill="none"
                  stroke="#007AFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
              <p className="mt-4 text-neutral-600 font-medium">完了</p>
            </div>
          )}
        </div>
      )}

      {stage === "language" && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-6 text-black">
            Select Language / 言語を選択
          </h2>
          <div className="flex flex-col space-y-3 w-full max-w-sm px-10">
            <button
              onClick={() => handleLanguageSelect("en")}
              className="px-6 py-3.5 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition shadow-md active:scale-95"
            >
              English
            </button>
            <button
              onClick={() => handleLanguageSelect("ja")}
              className="px-6 py-3.5 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition shadow-md active:scale-95"
            >
              日本語
            </button>
            <button
              onClick={() => handleLanguageSelect("ms")}
              className="px-6 py-3.5 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition shadow-md active:scale-95"
            >
              Melayu
            </button>
          </div>
        </div>
      )}

      {stage === "profile" && language && (
        <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full animate-fade-in-up">
          <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 w-full text-center border border-black/5 mt-8">
            <div className="w-24 h-24 bg-blue-50 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white shadow-sm">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Hardy"
                alt="Hardy Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-2xl font-bold text-black mb-1">
              {profileData[language].name}
            </h1>
            <p className="text-sm font-semibold text-[#007aff] mb-4 tracking-widest uppercase">
              {profileData[language].greeting}
            </p>

            <p className="text-neutral-500 mb-8 leading-relaxed">
              {profileData[language].intro}
            </p>

            <div className="flex justify-center space-x-6 text-neutral-400">
              <a
                href="https://x.com/luqhardy"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-transform hover:scale-110"
              >
                <XIcon fontSize="large" />
              </a>
              <a
                href="https://luqmanhadi.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-transform hover:scale-110"
              >
                <LanguageIcon fontSize="large" />
              </a>
              <a
                href="mailto:hello@luqmanhadi.com"
                className="hover:text-black transition-transform hover:scale-110"
              >
                <AlternateEmailIcon fontSize="large" />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto pt-6 w-full text-center text-[10px] text-neutral-400 relative z-10 animate-fade-in-up">
        <p>
          © 2026 特定非営利活動法人 在日マレーシア人ふにゃおすなでなで推進委員会
          <br />
          <span className="opacity-80">
            (Specified Non-Profit Corporation: Malaysians in Japan Funyaosu
            Head-Patting Promotion Committee)
          </span>
        </p>
      </div>
    </main>
  );
}
