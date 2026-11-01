"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/audio";
import { STORY_CONFIG } from "@/config/story";
import { Sparkles, Compass, ChevronDown } from "lucide-react";

interface WaxSealEnvelopeProps {
  onFinishedReading?: () => void;
}

export default function WaxSealEnvelope({ onFinishedReading }: WaxSealEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;

    if (soundEngine) {
      soundEngine.registerUserInteraction();
      soundEngine.playEnvelopeOpen();
    }

    setIsBroken(true);

    setTimeout(() => {
      setIsOpen(true);
    }, 400);

    setTimeout(() => {
      setShowLetter(true);
    }, 1100);
  };

  const letter = STORY_CONFIG.letter;

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[460px] py-6">
      <AnimatePresence mode="wait">
        {!showLetter ? (
          /* ENVELOPE STAGE */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20, transition: { duration: 0.6 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Gentle prompt above envelope */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="font-serif italic text-sm sm:text-base text-[#D6B77A] mb-6 tracking-wide flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D6B77A]" />
              Touche le sceau pour découvrir ma lettre
              <Sparkles className="w-4 h-4 text-[#D6B77A]" />
            </motion.p>

            {/* 3D Envelope container */}
            <div
              onClick={handleOpenEnvelope}
              className="relative w-[320px] sm:w-[440px] h-[220px] sm:h-[280px] cursor-pointer group select-none transition-transform duration-300 hover:scale-[1.02]"
              style={{ perspective: 1000 }}
            >
              {/* Envelope Back Body */}
              <div className="absolute inset-0 rounded-lg bg-[#270812] border border-[#D6B77A]/30 shadow-2xl overflow-hidden">
                {/* Vintage paper texture background */}
                <div
                  className="absolute inset-0 opacity-20 bg-cover bg-center"
                  style={{ backgroundImage: `url('${STORY_CONFIG.assets.images.letterBg}')` }}
                />
              </div>

              {/* Emerging Letter Inside preview */}
              <motion.div
                className="absolute left-6 right-6 top-4 bottom-4 rounded bg-[#FAF5EE] shadow-md border border-[#D6B77A]/40 flex flex-col items-center justify-center p-4 text-center"
                animate={isOpen ? { y: -120, opacity: 0.95 } : { y: 0, opacity: 0.7 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="w-12 h-0.5 bg-[#711F35]/40 mb-2 rounded" />
                <p className="font-serif italic text-xs text-[#521323]">
                  {letter.header}
                </p>
                <div className="w-16 h-0.5 bg-[#711F35]/30 mt-2 rounded" />
              </motion.div>

              {/* Envelope Lower Fold (Pocket V) */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)",
                  background: "linear-gradient(180deg, #380C1B 0%, #20070F 100%)",
                  borderBottom: "1px solid rgba(214, 183, 122, 0.4)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                }}
              />

              {/* Envelope Side Folds */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  clipPath: "polygon(0 0, 50% 55%, 0 100%)",
                  background: "linear-gradient(90deg, #2D0916 0%, #1A050D 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                  clipPath: "polygon(100% 0, 50% 55%, 100% 100%)",
                  background: "linear-gradient(270deg, #2D0916 0%, #1A050D 100%)",
                }}
              />

              {/* Envelope Top Flap (Flips open in 3D) */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{
                  transformOrigin: "top",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(180deg, #440F21 0%, #290814 100%)",
                  borderTop: "1px solid rgba(214, 183, 122, 0.4)",
                }}
                animate={isOpen ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 30 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />

              {/* Wax Seal with Monogram "I" for Ivana */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-[44%] -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer"
                animate={
                  isBroken
                    ? { scale: [1, 1.25, 0.8], opacity: [1, 1, 0] }
                    : { scale: [1, 1.06, 1] }
                }
                transition={
                  isBroken
                    ? { duration: 0.5, ease: "easeOut" }
                    : { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
                }
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full wax-seal flex items-center justify-center border-2 border-[#D6B77A]/60 shadow-[0_8px_25px_rgba(0,0,0,0.7)] group-hover:shadow-[#D6B77A]/40 transition-shadow">
                  {/* Outer rim texture */}
                  <div className="absolute inset-1 rounded-full border border-white/20 opacity-40" />

                  {/* Embossed Monogram 'I' in Wax for Ivana */}
                  <span className="font-serif italic font-bold text-2xl sm:text-3xl text-[#F7E7C4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-transform group-hover:scale-110 select-none">
                    I
                  </span>

                  {/* Breaking particles when clicked */}
                  {isBroken && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B22240] opacity-75" />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* FULL UNFOLDED LETTER STAGE */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl mx-auto my-2"
          >
            {/* Elegant Vintage Parchment Paper */}
            <div className="relative parchment-sheet rounded-2xl p-6 sm:p-10 md:p-12 border border-[#D6B77A]/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
              {/* Subtle vintage watermark emblem */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-15 pointer-events-none">
                <Compass className="w-16 h-16 text-[#711F35]" />
              </div>

              {/* Ornate letter header border */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="flex items-center gap-3 text-[#D6B77A] opacity-70 mb-2">
                  <span className="h-[1px] w-12 bg-[#D6B77A]" />
                  <Sparkles className="w-3.5 h-3.5 text-[#711F35]" />
                  <span className="h-[1px] w-12 bg-[#D6B77A]" />
                </div>
                <h3 className="font-serif italic text-lg sm:text-xl text-[#3B101D] text-center font-medium">
                  {letter.header}
                </h3>
              </div>

              {/* Salutation */}
              <p className="font-serif italic text-xl sm:text-2xl text-[#711F35] font-semibold mb-6">
                {letter.salutation}
              </p>

              {/* Letter Paragraphs with Staggered Fade-in */}
              <div className="space-y-4 sm:space-y-5 text-[#2A0E14] font-serif text-base sm:text-lg leading-relaxed text-justify">
                {letter.paragraphs.map((p, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * index, duration: 0.6 }}
                    className={
                      p === "Je suis sincèrement désolé."
                        ? "text-[#711F35] font-semibold text-lg sm:text-xl italic text-center py-2"
                        : ""
                    }
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Signoff & Calligraphic Signature */}
              <div className="mt-8 pt-6 border-t border-[#D6B77A]/30 flex flex-col items-end text-right">
                <p className="font-serif italic text-sm sm:text-base text-[#501323]">
                  {letter.signoff}
                </p>
                <p className="font-script text-2xl sm:text-3xl text-[#711F35] mt-1 font-normal">
                  {letter.signature}
                </p>
              </div>
            </div>

            {/* CTA to Next Stage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={onFinishedReading}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#711F35] via-[#8C2341] to-[#711F35] text-[#FFF4E8] font-serif tracking-widest uppercase text-xs sm:text-sm shadow-xl hover:shadow-[#711F35]/50 border border-[#D6B77A]/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{letter.cta}</span>
                <ChevronDown className="w-4 h-4 text-[#D6B77A] group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
