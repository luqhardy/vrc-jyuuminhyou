"use client";

import React, { useState, useEffect, useRef } from "react";
import XIcon from "@mui/icons-material/X";
import LanguageIcon from "@mui/icons-material/Language";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { WebHaptics, defaultPatterns } from "web-haptics";
import { animate, createScope, spring, createDraggable } from "animejs";
import { scrambleText } from "animejs/text";
import Link from "next/link";
import { Geist_Mono } from "next/font/google";
import Image from 'next/image'
import ModelViewer from "@/components/ModelViewer";


const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

type ValidLanguage = "en" | "ja";
type AnimationStage =
  | "initial"
  | "entering"
  | "processing"
  | "done"
  | "fadeout"
  | "language"
  | "profile";

export default function Home() {
  const rawAscii = `

    　　 ∩＿∩　　 ／￣￣￣￣￣
    　　（　´∀｀）＜　日本語は全てVRChatから学んだ
    　　（　　　　）＼＿＿＿＿＿
    　　｜ ｜　|
    　　（_＿）＿）
`;
  const name = `Hardy. @luqhardy`;
  const [stage, setStage] = useState<AnimationStage>("initial");
  const language: ValidLanguage = "en";
  const [particles, setParticles] = useState<any[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hapticsRef = useRef<any>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const messageRef =
    "Nice to meet you! I am Hardy! Inspired by the Japanese Nico Nico Douga subculture, I decided to study in Japan! Thank you for scanning my VRChat Residence Card. I　an interested in non-standard language acquisition methods by using media such as anime, manga and VRChat.";
  const messageRefJa =
    "はじめまして、ハーディです！ニコニコ動画をはじめとして日本のサブカルチャーに魅力され、日本に留学しに来ました！　VRChat住民票をスキャンいただき、誠にありがとうございました。VRC、アニメ、漫画、ゲームなんかで言語を学習する非標準的な第2言語習得方法に興味があります。よろしくお願いします！";
  //  const websitelink =

  const profileData: Record<
    ValidLanguage,
    { greeting: string; name: string; intro: string }
  > = {
    en: {
      greeting: "Scan Complete",
      name: rawAscii,
      intro:
        "Resident of 'Nadenade Matching' since Spring 2026. Trust Level: USER. Self-proclaimed Japanese speaker.",
    },
    ja: {
      greeting: "完了",
      name: "Hardy ハーディ (luqhardy)",
      intro:
        "現住所：なでなでマッチング。2026年春から住民。信頼レベル：USER。自称日本語話者。",
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      hapticsRef.current = new WebHaptics();
    }

    setParticles(
      Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 1,
        tx: (Math.random() - 0.5) * 600,
        ty: (Math.random() - 0.5) * 600,
        delay: Math.random() * 3,
        duration: 1.5 + Math.random() * 2.5,
        isBlue: i % 4 === 0,
      })),
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStage("entering");

    const enterTimer = setTimeout(() => {
      setStage("processing");

      setTimeout(() => {
        setStage("done");

        if (hapticsRef.current) {
          hapticsRef.current.trigger(defaultPatterns.success);
        }
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current
            .play()
            .catch((e: Error) => console.log("Audio playback blocked:", e));
        }

        if (hapticsRef.current) {
          hapticsRef.current.trigger();
        }

        setTimeout(() => {
          setStage("fadeout");

          setTimeout(() => {
            setStage("profile");
          }, 500);
        }, 2000);
      }, 1000);
    }, 1200);

    return () => clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    if (stage === "profile" && language && nameRef.current) {
      animate(nameRef.current, {
        innerHTML: scrambleText({
          text: profileData[language].name,
          from: "center",
          reversed: false,
          ease: "linear",
          chars: "shades",
          cursor: "░▒▓█",
          override: true,
          perturbation: 0.0,
          duration: 0,
          delay: 0,
          revealDelay: 0,
          revealRate: 50,
          settleDuration: 1000,
          settleRate: 1000,
        }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, language]);

  return (
    <main
      className={`min-h-screen flex flex-col items-center p-0 font-sans overflow-hidden transition-colors duration-500 ${
        stage === "profile" ? "bg-black text-white" : "bg-[#f2f2f7] text-black"
      }`}
    >
      <audio ref={audioRef} src="/ding.mp3" preload="auto" />

      {(stage === "entering" ||
        stage === "processing" ||
        stage === "done" ||
        stage === "fadeout") && (
        <div
          className={`fixed inset-0 flex flex-col items-center justify-start ${stage === "fadeout" ? "animate-element-fade-out" : "animate-element-fade-in"}`}
        >
          {/* Card Image Container */}
          <div
            className={`relative mt-12 px-6 w-full flex justify-center ${stage === "entering" ? "animate-card-slide-down" : ""} ${stage === "processing" ? "animate-card-hold-pulse" : ""}`}
          >
            {/* iOS NameDrop-style Aura/Bloom behind the card */}
            {(stage === "processing" ||
              stage === "entering" ||
              stage === "done") && (
              <div className="absolute top-0 left-0 w-full h-[120%] -z-10 pointer-events-none flex justify-center items-center">
                {/* Huge glowing orb */}
                <div
                  className={`absolute w-[300px] h-[300px] bg-[#007AFF] rounded-full blur-[80px] opacity-20 ${stage === "entering" ? "animate-blob-pulse" : "animate-pulse"}`}
                />
                <div
                  className="absolute w-[200px] h-[200px] bg-white rounded-full blur-[60px] opacity-30 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />

                {/* Sprawling background particles (NameDrop style) */}
                {particles.map((p) => (
                  <div
                    key={p.id}
                    className={`absolute rounded-full animate-namedrop-particle ${p.isBlue ? "bg-[#007AFF] shadow-[0_0_15px_4px_rgba(0,122,255,0.8)]" : "bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.9)]"}`}
                    style={
                      {
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        "--tx": `${p.tx}px`,
                        "--ty": `${p.ty}px`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}

            <div className="relative w-full max-w-sm rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border border-white/20 transform-gpu z-10 bg-white/50 backdrop-blur-md">
              {/* Using standard img tag pointing to the public folder */}
              <Image
                src="/vrc-card.png"
                alt="VRChat Resident Card" 
                className="w-full relative z-10 mix-blend-normal"
                width={400}
                height={250}
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

      {stage === "profile" && language && (
        <div className="bg-black p-5 items-center justify-center animate-fade-in-up mb-3 w-full h-full font-mono">

          <div className="relative w-full h-[1000px] mt-6 rounded-3xl overflow-hidden">
            <ModelViewer />
            <div className="absolute inset-x-6 top-1 rounded-[32px] bg-black/40 backdrop-blur-sm shadow-2xl border border-white/20 p-10 pt-6 mt-6 flex flex-col items-left">
            <div 
                className="text-white p-0 rounded-lg text-[10px] whitespace-pre md:text-[10px] font-mono leading-tight tracking-normal overflow-hidden"
                style={{
                  fontFamily: '"Geist Mono"',
                  lineHeight: "1.2",
                }}
                ref={nameRef}
              ></div>
            <div className="text-[10px]">
            <br />
            {messageRef}
            <br />
            <br />
            {messageRefJa}
            <br />
          </div>
            <a
              href="https://vrchat.com/home/user/usr_976b3f82-538b-4a14-bede-768dbee3784a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-sm transform-gpu transition duration-300 ease-out hover:scale-110 hover:brightness-110 w-[100px] h-[100px]"
            >
              <br />
              <Image
                src="/button.png"
                alt="VRChat profile button"
                width={100}
                height={100}
                className="inline-block rounded-xl"
              />
            </a>
              
            </div>
          </div>

          <p className="text-neutral-400 text-[10px] mt-6">
            <a
              href="https://luqmanhadi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600"
            >
              Visit My Website/個人サイトはこちらから
            </a>
          </p>
        </div>
      )}
 
      <div
        className={`mt-auto p-6 w-full text-center text-[10px] relative z-10 h-40 animate-fade-in-up ${stage === "profile" ? "text-neutral-400" : "text-neutral-600"}`}
      >
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
