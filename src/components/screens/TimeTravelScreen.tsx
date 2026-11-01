"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VintageClock from "@/components/VintageClock";
import { STORY_CONFIG } from "@/config/story";
import { soundEngine } from "@/lib/audio";
import { Calendar, Sparkles, ArrowRight, Clock } from "lucide-react";

interface TimeTravelScreenProps {
  onNext: () => void;
}

export default function TimeTravelScreen({ onNext }: TimeTravelScreenProps) {
  const [isRewinding, setIsRewinding] = useState(true);
  const [displayedDate, setDisplayedDate] = useState("Aujourd'hui");
  const [rewindProgress, setRewindProgress] = useState(0);

  const event = STORY_CONFIG.event;
  const timeTravel = STORY_CONFIG.timeTravel;

  useEffect(() => {
    // Sound rewind trigger
    if (soundEngine) {
      soundEngine.playRewind();
    }

    // Date rewind ticker animation
    const dates = [
      "Aujourd'hui",
      "Hier",
      "Il y a quelques jours",
      "La semaine passée",
      "Le mois dernier",
      event.symbolicDate,
    ];

    let currentStep = 0;
    const ticker = setInterval(() => {
      currentStep++;
      if (currentStep < dates.length) {
        setDisplayedDate(dates[currentStep]);
        setRewindProgress((currentStep / (dates.length - 1)) * 100);
      } else {
        clearInterval(ticker);
        setIsRewinding(false);
        if (soundEngine) {
          soundEngine.playChime();
        }
      }
    }, 450);

    return () => clearInterval(ticker);
  }, [event.symbolicDate]);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 max-w-4xl mx-auto z-20">
      {/* Temporal Vortex Distortion Background effect */}
      <motion.div
        animate={
          isRewinding
            ? {
                rotate: -360,
                scale: [1, 1.25, 0.95, 1.1],
                opacity: [0.35, 0.7, 0.35],
              }
            : { rotate: 0, scale: 1, opacity: 0.25 }
        }
        transition={
          isRewinding
            ? { repeat: Infinity, duration: 4, ease: "linear" }
            : { duration: 1.5 }
        }
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[620px] h-[380px] sm:h-[620px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(214,183,122,0.22)_0%,_rgba(113,31,53,0.35)_45%,_transparent_75%)] blur-2xl pointer-events-none"
      />

      {/* Rewind Clock */}
      <div className="relative mb-6">
        <VintageClock
          mode={isRewinding ? "rewind" : "stopped"}
          size={240}
          enableSound={false}
        />

        {/* Temporal rings expanding */}
        {isRewinding && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="w-64 h-64 rounded-full border border-[#D6B77A]/40 animate-ping opacity-30" />
          </div>
        )}
      </div>

      {/* Date Counter Display (Rewinding indicator) */}
      <motion.div
        layout
        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-bordeaux border border-[#D6B77A]/40 mb-6 shadow-xl"
      >
        <Calendar className="w-4 h-4 text-[#D6B77A]" />
        <span className="font-serif tracking-widest text-sm sm:text-base text-[#FFF4E8] font-medium">
          {displayedDate}
        </span>
        <Clock className={`w-3.5 h-3.5 text-[#D6B77A] ${isRewinding ? "animate-spin" : ""}`} />
      </motion.div>

      {/* State Text & Narrative */}
      <AnimatePresence mode="wait">
        {isRewinding ? (
          <motion.div
            key="rewinding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="font-serif italic text-lg sm:text-2xl text-[#D6B77A] glow-gold-text">
              Rembobinage du temps…
            </p>
            <div className="w-48 h-1 bg-[#3B101D] rounded-full overflow-hidden border border-[#D6B77A]/30">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D6B77A] to-[#F7E7C4]"
                style={{ width: `${rewindProgress}%` }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="arrived"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-2xl"
          >
            <span className="text-xs font-serif tracking-[0.25em] text-[#D6B77A] uppercase mb-3">
              {event.displayDate}
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#FFF4E8] font-light mb-6 glow-rose-text">
              {timeTravel.title}
            </h2>

            <blockquote className="relative p-6 sm:p-8 rounded-2xl glass-card border border-[#D6B77A]/30 mb-8 shadow-2xl">
              <p className="font-serif italic text-base sm:text-xl text-[#FFF4E8] leading-relaxed">
                « {timeTravel.message} »
              </p>
            </blockquote>

            <button
              onClick={onNext}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-[#711F35] via-[#8C2442] to-[#711F35] text-[#FFF4E8] font-serif tracking-widest uppercase text-xs sm:text-sm border border-[#D6B77A]/50 shadow-lg hover:shadow-[#D6B77A]/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D6B77A]" />
              <span>{timeTravel.cta}</span>
              <ArrowRight className="w-4 h-4 text-[#D6B77A] group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
