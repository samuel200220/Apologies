"use client";

import React from "react";
import { motion } from "framer-motion";
import VintageClock from "@/components/VintageClock";
import { STORY_CONFIG } from "@/config/story";
import { Sparkles, ArrowRight, Clock } from "lucide-react";
import { soundEngine } from "@/lib/audio";

interface IntroScreenProps {
  onNext: () => void;
}

export default function IntroScreen({ onNext }: IntroScreenProps) {
  const intro = STORY_CONFIG.intro;

  const handleStart = () => {
    if (soundEngine) {
      soundEngine.registerUserInteraction();
      soundEngine.startBackgroundMusic(STORY_CONFIG.assets.audio.bgMusic);
    }
    onNext();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 max-w-4xl mx-auto z-20">
      {/* Soft Vignette and Ambient Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-radial from-[#711F35]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Antique Pocket Watch Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 relative"
      >
        <VintageClock mode="normal" size={240} />
      </motion.div>

      {/* Elegant Sub-Header pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6B77A]/30 bg-[#260812]/70 backdrop-blur-md mb-6"
      >
        <Clock className="w-3.5 h-3.5 text-[#D6B77A]" />
        <span className="text-xs font-serif tracking-[0.2em] text-[#D6B77A] uppercase">
          Un instant dans le temps &bull; Pour Ivana
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#FFF4E8] glow-rose-text mb-6 leading-tight"
      >
        {intro.title}
      </motion.h1>

      {/* Main Narrative Sentence */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="font-sans text-base sm:text-lg md:text-xl text-[#E8C7CB]/90 max-w-2xl font-light leading-relaxed mb-10 text-balance"
      >
        {intro.lead}
      </motion.p>

      {/* Primary Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#711F35] via-[#8C2442] to-[#711F35] text-[#FFF4E8] font-serif tracking-widest uppercase text-xs sm:text-sm border border-[#D6B77A]/50 shadow-[0_0_30px_rgba(113,31,53,0.5)] hover:shadow-[0_0_40px_rgba(214,183,122,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#D6B77A] animate-pulse" />
          <span>{intro.cta}</span>
          <ArrowRight className="w-4 h-4 text-[#D6B77A] group-hover:translate-x-1.5 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
