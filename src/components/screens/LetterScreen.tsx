"use client";

import React from "react";
import { motion } from "framer-motion";
import WaxSealEnvelope from "@/components/WaxSealEnvelope";
import { Mail, Sparkles } from "lucide-react";

interface LetterScreenProps {
  onNext: () => void;
}

export default function LetterScreen({ onNext }: LetterScreenProps) {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 max-w-4xl mx-auto z-20">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D6B77A]/30 bg-[#250811]/70 mb-3">
          <Mail className="w-3 h-3 text-[#D6B77A]" />
          <span className="text-[11px] font-serif tracking-[0.25em] text-[#D6B77A] uppercase">
            Pour Ivana
          </span>
          <Sparkles className="w-3 h-3 text-[#D6B77A]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FFF4E8] glow-rose-text">
          La Lettre d&apos;Excuses
        </h2>
      </motion.div>

      {/* Interactive 3D Envelope & Unfolding Parchment */}
      <WaxSealEnvelope onFinishedReading={onNext} />
    </div>
  );
}
