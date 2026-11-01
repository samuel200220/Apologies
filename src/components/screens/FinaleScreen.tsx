"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VintageClock from "@/components/VintageClock";
import { STORY_CONFIG } from "@/config/story";
import { soundEngine } from "@/lib/audio";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Utensils,
  Footprints,
  CheckCircle2,
  Clock,
  RotateCcw,
  Coffee,
} from "lucide-react";
import Image from "next/image";

interface FinaleScreenProps {
  onRestart: () => void;
}

export default function FinaleScreen({ onRestart }: FinaleScreenProps) {
  const [subStep, setSubStep] = useState<1 | 2 | 3>(1);
  const [userChoice, setUserChoice] = useState<"accepted" | "declined" | null>(null);
  const [selectedMomentId, setSelectedMomentId] = useState<string | null>(null);

  const finale = STORY_CONFIG.finale;

  const triggerGoldenConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D6B77A", "#F7E7C4", "#B22240", "#711F35", "#E8C7CB"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleRevealSurprise = () => {
    if (soundEngine) {
      soundEngine.playChime();
    }
    triggerGoldenConfetti();
    setSubStep(2);

    // Auto-advance to step 3 after cinematic sequence or let user click
    setTimeout(() => {
      setSubStep(3);
    }, 4500);
  };

  const handleAccept = () => {
    setUserChoice("accepted");
    if (soundEngine) {
      soundEngine.playChime();
    }
    triggerGoldenConfetti();
  };

  const handleDecline = () => {
    setUserChoice("declined");
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 max-w-4xl mx-auto z-20">
      <AnimatePresence mode="wait">
        {/* ÉTAPE 1 : QUESTION INITIALE */}
        {subStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-2xl"
          >
            {/* Clock in background */}
            <div className="mb-6 opacity-75">
              <VintageClock mode="normal" size={190} />
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6B77A]/30 bg-[#250811]/70 mb-6"
            >
              <Clock className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span className="text-xs font-serif tracking-[0.2em] text-[#D6B77A] uppercase">
                Pour Ivana
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D6B77A]" />
            </motion.div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#FFF4E8] glow-rose-text mb-8 leading-relaxed">
              « {finale.question} »
            </h2>

            <button
              onClick={handleRevealSurprise}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 rounded-full bg-gradient-to-r from-[#D6B77A] via-[#F7E7C4] to-[#D6B77A] text-[#1E060E] font-serif tracking-widest uppercase text-xs sm:text-sm font-semibold shadow-[0_0_35px_rgba(214,183,122,0.5)] hover:shadow-[0_0_50px_rgba(214,183,122,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#711F35]" />
              <span>{finale.ctaReveal}</span>
              <Coffee className="w-4 h-4 text-[#711F35]" />
            </button>
          </motion.div>
        )}

        {/* ÉTAPE 2 : CINÉMATIQUE (HORLOGE ARRÊTÉE + LUMIÈRE DORÉE + PÉTALES) */}
        {subStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center max-w-2xl"
          >
            {/* Stopped clock with warm golden glow */}
            <div className="relative mb-6">
              <VintageClock mode="stopped" size={240} />

              {/* Radiant pulsating golden light */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-28 h-28 rounded-full bg-radial from-[#D6B77A]/40 to-transparent blur-xl" />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-serif italic text-sm text-[#D6B77A] tracking-widest uppercase mb-3"
            >
              Le temps s&apos;arrête…
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="font-serif text-2xl sm:text-4xl text-[#FFF4E8] font-light leading-relaxed max-w-xl glow-rose-text"
            >
              « {finale.cinematicQuote} »
            </motion.h2>

            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              onClick={() => setSubStep(3)}
              className="mt-8 group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D6B77A]/40 bg-[#260812]/80 text-xs font-serif tracking-widest text-[#D6B77A] hover:bg-[#D6B77A] hover:text-[#19050C] transition-all cursor-pointer shadow-lg"
            >
              <span>Découvrir la proposition</span>
              <Sparkles className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        )}

        {/* ÉTAPE 3 : DERNIÈRE CARTE INTERACTIVE (RESTAURANT OU BALADE) */}
        {subStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl"
          >
            <div className="relative rounded-3xl glass-card p-6 sm:p-10 md:p-12 border border-[#D6B77A]/35 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Luxury rose image backdrop */}
              <div className="absolute inset-0 -z-10 opacity-20">
                <Image
                  src={STORY_CONFIG.assets.images.rose}
                  alt="Rose"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A050D] via-[#2A0B14]/90 to-[#19050C]" />
              </div>

              {/* Header emblem */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#711F35]/60 border border-[#D6B77A]/40 flex items-center justify-center glow-gold">
                  <Sparkles className="w-8 h-8 text-[#F7E7C4] animate-pulse" />
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#FFF4E8] glow-rose-text mb-6">
                {finale.cardTitle}
              </h2>

              {/* No choice made yet: show both buttons */}
              {userChoice === null && (
                <div className="flex flex-col items-center gap-4 mt-8">
                  {/* Positive button */}
                  <button
                    onClick={handleAccept}
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#D6B77A] via-[#F7E7C4] to-[#D6B77A] text-[#1E060E] font-serif font-semibold tracking-wider uppercase text-xs sm:text-sm shadow-[0_0_35px_rgba(214,183,122,0.5)] hover:shadow-[0_0_45px_rgba(214,183,122,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#711F35]" />
                    <span>{finale.acceptButton}</span>
                  </button>

                  {/* Gentle alternative button */}
                  <button
                    onClick={handleDecline}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-serif tracking-wider text-[#E8C7CB]/80 hover:text-[#FFF4E8] hover:bg-white/5 border border-transparent hover:border-[#D6B77A]/20 transition-all cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#D6B77A]/70" />
                    <span>{finale.gentleDeclineButton}</span>
                  </button>
                </div>
              )}

              {/* Outcome A: Accepted -> Selection between Restaurant and Walk */}
              {userChoice === "accepted" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 mt-6"
                >
                  <div className="p-4 sm:p-6 rounded-2xl bg-[#3B101D]/70 border border-[#D6B77A]/40 text-center">
                    <p className="font-serif italic text-base sm:text-xl text-[#F7E7C4] leading-relaxed">
                      « {finale.acceptMessage} »
                    </p>
                  </div>

                  {/* The Two Choices: Restaurant ou Balade */}
                  <div className="text-left">
                    <p className="font-serif text-sm sm:text-base text-[#D6B77A] font-medium mb-3 text-center sm:text-left">
                      {finale.ideasTitle}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {finale.suggestedMoments.map((m) => {
                        const isSelected = selectedMomentId === m.id;
                        return (
                          <div
                            key={m.id}
                            onClick={() => setSelectedMomentId(m.id)}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? "bg-[#711F35]/90 border-[#D6B77A] shadow-[0_0_25px_rgba(214,183,122,0.4)] scale-[1.02]"
                                : "bg-[#250811]/70 border-white/10 hover:border-[#D6B77A]/50 hover:bg-[#250811]"
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-[#3B101D] flex items-center justify-center border border-[#D6B77A]/30">
                                {m.id === "restaurant" ? (
                                  <Utensils className="w-4 h-4 text-[#D6B77A]" />
                                ) : (
                                  <Footprints className="w-4 h-4 text-[#D6B77A]" />
                                )}
                              </div>
                              <span className="font-serif text-base sm:text-lg font-semibold text-[#FFF4E8]">
                                {m.title}
                              </span>
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-[#D6B77A] ml-auto" />
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-[#E8C7CB]/80 font-sans leading-relaxed">
                              {m.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Confirmation note when option is picked */}
                  {selectedMomentId && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3.5 rounded-xl bg-[#20070F] border border-[#D6B77A]/40 text-center"
                    >
                      <p className="text-xs sm:text-sm font-serif text-[#F7E7C4]">
                        C&apos;est noté ! Hâte de partager ce moment avec toi, Ivana ✨
                      </p>
                    </motion.div>
                  )}

                  <div className="pt-4 flex flex-col items-center gap-3">
                    <p className="font-script text-2xl sm:text-3xl text-[#D6B77A]">
                      À très bientôt, Ivana ✨
                    </p>
                    <button
                      onClick={onRestart}
                      className="inline-flex items-center gap-2 text-xs font-serif text-[#E8C7CB]/60 hover:text-[#D6B77A] transition-colors mt-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Recommencer l&apos;histoire depuis le début</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Outcome B: Gentle Decline (No pressure, pure reassurance) */}
              {userChoice === "declined" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 mt-6"
                >
                  <div className="p-6 rounded-2xl bg-[#2A0914]/80 border border-[#D6B77A]/30 text-center">
                    <Sparkles className="w-8 h-8 text-[#D6B77A] mx-auto mb-3" />
                    <p className="font-serif italic text-base sm:text-xl text-[#FFF4E8] leading-relaxed">
                      {finale.gentleDeclineMessage}
                    </p>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={onRestart}
                      className="inline-flex items-center gap-2 text-xs font-serif text-[#E8C7CB]/60 hover:text-[#D6B77A] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Revenir au début</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
