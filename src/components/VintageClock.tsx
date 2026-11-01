"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/audio";

interface VintageClockProps {
  mode?: "normal" | "rewind" | "stopped" | "static";
  size?: number;
  className?: string;
  enableSound?: boolean;
}

export default function VintageClock({
  mode = "normal",
  size = 280,
  className = "",
  enableSound = true,
}: VintageClockProps) {
  const [seconds, setSeconds] = useState(0);
  const [rewindAngle, setRewindAngle] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Sound & tick effect in normal mode
  useEffect(() => {
    if (mode !== "normal") return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
      if (enableSound && soundEngine) {
        soundEngine.playTick(seconds % 2 === 0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, enableSound, seconds]);

  // Smooth high-speed rewind rotation loop
  useEffect(() => {
    if (mode === "rewind") {
      if (enableSound && soundEngine) {
        soundEngine.playRewind();
      }

      lastTimeRef.current = performance.now();

      const animateRewind = (now: number) => {
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;
        // Rewinds 720 degrees per second (smooth counter-clockwise)
        setRewindAngle((prev) => (prev - delta * 720) % 36000);
        rafRef.current = requestAnimationFrame(animateRewind);
      };

      rafRef.current = requestAnimationFrame(animateRewind);

      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  }, [mode, enableSound]);

  // Precise Angles calculated from center (100, 105)
  // Hour hand:
  const hourAngle =
    mode === "rewind"
      ? (rewindAngle * 0.2) % 360
      : mode === "stopped"
      ? 240 // Points to 8:00 (VIII)
      : (240 + (seconds / 3600) * 30) % 360;

  // Minute hand:
  const minuteAngle =
    mode === "rewind"
      ? (rewindAngle * 1.5) % 360
      : mode === "stopped"
      ? 0 // Points to 12:00 (XII)
      : ((seconds / 60) * 360) % 360;

  // Second hand:
  const secondAngle = (seconds % 60) * 6;

  // Roman numerals positions around dial
  const numerals = [
    { label: "XII", angle: 0 },
    { label: "I", angle: 30 },
    { label: "II", angle: 60 },
    { label: "III", angle: 90 },
    { label: "IV", angle: 120 },
    { label: "V", angle: 150 },
    { label: "VI", angle: 180 },
    { label: "VII", angle: 210 },
    { label: "VIII", angle: 240 },
    { label: "IX", angle: 270 },
    { label: "X", angle: 300 },
    { label: "XI", angle: 330 },
  ];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient golden glow */}
      <motion.div
        animate={
          mode === "rewind"
            ? { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }
            : mode === "stopped"
            ? { scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }
            : { scale: [1, 1.03, 1], opacity: [0.3, 0.5, 0.3] }
        }
        transition={{ repeat: Infinity, duration: mode === "rewind" ? 1.2 : 4, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D6B77A]/20 via-[#711F35]/30 to-[#D6B77A]/20 blur-2xl pointer-events-none"
      />

      {/* SVG Clock Dial */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] overflow-visible"
      >
        <defs>
          <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2A0B14" />
            <stop offset="65%" stopColor="#1E060E" />
            <stop offset="95%" stopColor="#130308" />
            <stop offset="100%" stopColor="#3B101D" />
          </radialGradient>

          <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7E7C4" />
            <stop offset="25%" stopColor="#D6B77A" />
            <stop offset="50%" stopColor="#9C7738" />
            <stop offset="75%" stopColor="#D6B77A" />
            <stop offset="100%" stopColor="#F7E7C4" />
          </linearGradient>

          <linearGradient id="handGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#9C7738" />
            <stop offset="50%" stopColor="#D6B77A" />
            <stop offset="100%" stopColor="#FFF8ED" />
          </linearGradient>

          <radialGradient id="centerGem" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#F7E7C4" />
            <stop offset="50%" stopColor="#D6B77A" />
            <stop offset="100%" stopColor="#6E4D1A" />
          </radialGradient>

          <filter id="clockGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Vintage Top Ring / Bow */}
        <circle
          cx="100"
          cy="12"
          r="9"
          fill="none"
          stroke="url(#goldRimGrad)"
          strokeWidth="3.5"
        />
        <rect
          x="96"
          y="18"
          width="8"
          height="7"
          rx="1"
          fill="url(#goldRimGrad)"
        />

        {/* Outer Bezel */}
        <circle
          cx="100"
          cy="105"
          r="86"
          fill="#16040A"
          stroke="url(#goldRimGrad)"
          strokeWidth="4.5"
        />

        {/* Inner Bezel Teeth */}
        <circle
          cx="100"
          cy="105"
          r="80"
          fill="none"
          stroke="#D6B77A"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.7"
        />

        {/* Main Dial Face (Center: 100, 105) */}
        <circle cx="100" cy="105" r="77" fill="url(#dialGrad)" />

        {/* Sunburst Pattern */}
        <g opacity="0.18">
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="105"
              x2={100 + 72 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={105 + 72 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="#D6B77A"
              strokeWidth="0.7"
            />
          ))}
        </g>

        {/* Inner Guilloche Circle */}
        <circle
          cx="100"
          cy="105"
          r="48"
          fill="none"
          stroke="#D6B77A"
          strokeWidth="0.8"
          opacity="0.4"
        />

        {/* Minute ticks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const isFiveMin = i % 5 === 0;
          const angle = (i * 6 * Math.PI) / 180;
          const r1 = isFiveMin ? 72 : 74;
          const r2 = 76;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.sin(angle)}
              y1={105 - r1 * Math.cos(angle)}
              x2={100 + r2 * Math.sin(angle)}
              y2={105 - r2 * Math.cos(angle)}
              stroke="#D6B77A"
              strokeWidth={isFiveMin ? 1.5 : 0.6}
              opacity={isFiveMin ? 0.9 : 0.4}
            />
          );
        })}

        {/* Roman Numerals */}
        {numerals.map((num) => {
          const rad = (num.angle * Math.PI) / 180;
          const rx = 100 + 60 * Math.sin(rad);
          const ry = 105 - 60 * Math.cos(rad);
          return (
            <text
              key={num.label}
              x={rx}
              y={ry + 4}
              textAnchor="middle"
              className="font-serif text-[10px] font-semibold tracking-tighter fill-[#D6B77A]"
              style={{
                letterSpacing: "0.5px",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
              }}
            >
              {num.label}
            </text>
          );
        })}

        {/* Temporal Waves during rewind */}
        {mode === "rewind" && (
          <motion.circle
            cx="100"
            cy="105"
            r="30"
            fill="none"
            stroke="#D6B77A"
            strokeWidth="2"
            animate={{
              r: [10, 75],
              opacity: [0.8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeOut",
            }}
          />
        )}

        {/* ======================================================== */}
        {/* CLOCK HANDS (ALL ROTATED STRICTLY AT PIVOT (100, 105))    */}
        {/* ======================================================== */}

        {/* 1. Hour Hand */}
        <g
          transform={`translate(100, 105) rotate(${hourAngle})`}
          filter="url(#clockGlow)"
        >
          {/* Ornate Spade Fleur-de-lis Hour Hand pointing strictly along -Y */}
          <path
            d="M -2.5 0 L -2 -22 C -2 -28 -5 -32 -2 -38 C 0 -42 0 -48 0 -48 C 0 -48 0 -42 2 -38 C 5 -32 2 -28 2 -22 L 2.5 0 Z"
            fill="url(#handGrad)"
          />
          {/* Hour Counter-Tail */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="14"
            stroke="url(#handGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="0" cy="12" r="2" fill="url(#handGrad)" />
        </g>

        {/* 2. Minute Hand */}
        <g
          transform={`translate(100, 105) rotate(${minuteAngle})`}
          filter="url(#clockGlow)"
        >
          {/* Ornate Diamond Lance Minute Hand pointing strictly along -Y */}
          <path
            d="M -2 0 L -2 -38 L -4 -48 L 0 -68 L 4 -48 L 2 -38 L 2 0 Z"
            fill="url(#handGrad)"
          />
          {/* Minute Counter-Tail */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="18"
            stroke="url(#handGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="0" cy="15" r="2.2" fill="url(#handGrad)" />
        </g>

        {/* 3. Second Hand (active in normal mode) */}
        {mode === "normal" && (
          <g
            transform={`translate(100, 105) rotate(${secondAngle})`}
            filter="url(#clockGlow)"
          >
            {/* Ultra-fine needle extending to -72 */}
            <line
              x1="0"
              y1="18"
              x2="0"
              y2="-72"
              stroke="#F7E7C4"
              strokeWidth="1"
            />
            {/* Delicate counterweight ring */}
            <circle cx="0" cy="-48" r="2.5" fill="#F7E7C4" />
            {/* Back counterweight pearl */}
            <circle cx="0" cy="16" r="2" fill="#D6B77A" />
          </g>
        )}

        {/* ======================================================== */}
        {/* CENTER PIVOT PIN & CAP (Placed above hands to seal pivot) */}
        {/* ======================================================== */}
        <circle cx="100" cy="105" r="5.5" fill="url(#goldRimGrad)" />
        <circle
          cx="100"
          cy="105"
          r="3.5"
          fill="url(#centerGem)"
          className={mode === "stopped" ? "animate-pulse" : ""}
        />
        <circle cx="100" cy="105" r="1.2" fill="#FFF4E8" opacity="0.8" />
      </svg>
    </div>
  );
}
