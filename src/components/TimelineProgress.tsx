"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineProgressProps {
  currentStep: number;
  maxReachedStep: number;
  onSelectStep: (step: number) => void;
}

const STEPS = [
  { id: 1, label: "Prologue", roman: "I" },
  { id: 2, label: "Le Temps", roman: "II" },
  { id: 3, label: "Ce Jour-Là", roman: "III" },
  { id: 4, label: "La Lettre", roman: "IV" },
  { id: 5, label: "Demain", roman: "V" },
];

export default function TimelineProgress({
  currentStep,
  maxReachedStep,
  onSelectStep,
}: TimelineProgressProps) {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40 max-w-md w-auto px-4 py-1.5 rounded-full glass-bordeaux border border-[#D6B77A]/20 shadow-xl">
      <div className="flex items-center gap-2 sm:gap-4">
        {STEPS.map((step, idx) => {
          const isCurrent = currentStep === step.id;
          const isUnlocked = step.id <= maxReachedStep;
          const isPast = step.id < currentStep;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => isUnlocked && onSelectStep(step.id)}
                disabled={!isUnlocked}
                title={step.label}
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isUnlocked ? "cursor-pointer group" : "cursor-not-allowed opacity-35"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-serif transition-all duration-500 ${
                    isCurrent
                      ? "bg-[#D6B77A] text-[#19050C] font-semibold glow-gold scale-110 ring-2 ring-[#F7E7C4]/50"
                      : isPast
                      ? "bg-[#711F35]/80 text-[#D6B77A] border border-[#D6B77A]/40"
                      : "bg-[#250811] text-[#E8C7CB]/50 border border-white/10"
                  }`}
                >
                  {step.roman}
                </div>

                {/* Subtitle label for desktop on hover */}
                <span className="hidden md:group-hover:block absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-sans tracking-wider text-[#D6B77A] bg-[#1F070E] px-2 py-0.5 rounded border border-[#D6B77A]/30 pointer-events-none shadow-md">
                  {step.label}
                </span>
              </button>

              {idx < STEPS.length - 1 && (
                <div className="w-3 sm:w-6 h-[1px] bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-[#D6B77A]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
