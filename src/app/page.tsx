"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldenDust from "@/components/GoldenDust";
import BackgroundPetals from "@/components/BackgroundPetals";
import AudioControl from "@/components/AudioControl";
import TimelineProgress from "@/components/TimelineProgress";
import IntroScreen from "@/components/screens/IntroScreen";
import TimeTravelScreen from "@/components/screens/TimeTravelScreen";
import ThatDayScreen from "@/components/screens/ThatDayScreen";
import LetterScreen from "@/components/screens/LetterScreen";
import FinaleScreen from "@/components/screens/FinaleScreen";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1);

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (step > maxReachedStep) {
      setMaxReachedStep(step);
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    goToStep(Math.min(currentStep + 1, 5));
  };

  const handleRestart = () => {
    goToStep(1);
  };

  return (
    <main className="relative min-h-screen bg-[#150409] text-[#FFF4E8] flex flex-col justify-between overflow-hidden">
      {/* Dynamic Golden Dust */}
      <GoldenDust intensity={currentStep === 2 || currentStep === 5 ? 1.6 : 0.9} />

      {/* Atmospheric Rose Petals */}
      <BackgroundPetals
        intense={currentStep === 5}
        reverse={currentStep === 2}
      />

      {/* Ambient Vignette & Deep Bordeaux Lighting */}
      <div className="fixed inset-0 vignette z-10 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(113,31,53,0.22)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(59,16,29,0.35)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      {/* Top Floating Controls */}
      <header>
        <TimelineProgress
          currentStep={currentStep}
          maxReachedStep={maxReachedStep}
          onSelectStep={(step) => goToStep(step)}
        />
        <AudioControl />
      </header>

      {/* Screen Sequence Transition with Framer Motion */}
      <div className="relative z-20 flex-1 flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.section
              key="step-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <IntroScreen onNext={handleNext} />
            </motion.section>
          )}

          {currentStep === 2 && (
            <motion.section
              key="step-2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <TimeTravelScreen onNext={handleNext} />
            </motion.section>
          )}

          {currentStep === 3 && (
            <motion.section
              key="step-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <ThatDayScreen onNext={handleNext} />
            </motion.section>
          )}

          {currentStep === 4 && (
            <motion.section
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <LetterScreen onNext={handleNext} />
            </motion.section>
          )}

          {currentStep === 5 && (
            <motion.section
              key="step-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <FinaleScreen onRestart={handleRestart} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Discreet Footer */}
      <footer className="relative z-20 text-center py-4 text-xs font-serif text-[#D6B77A]/50 tracking-wider">
        <span>Un instant dans le temps &bull; En toute amitié et sincérité</span>
      </footer>
    </main>
  );
}
