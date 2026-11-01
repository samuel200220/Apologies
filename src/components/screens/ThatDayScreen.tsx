"use client";

import React from "react";
import { motion } from "framer-motion";
import { STORY_CONFIG } from "@/config/story";
import { Sparkles, Mail, ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";

interface ThatDayScreenProps {
  onNext: () => void;
}

export default function ThatDayScreen({ onNext }: ThatDayScreenProps) {
  const thatDay = STORY_CONFIG.thatDay;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 max-w-4xl mx-auto z-20">
      {/* Visual Romantic Photo Card with soft bordeaux glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden glass-card p-6 sm:p-10 border border-[#D6B77A]/30 shadow-2xl mb-8"
      >
        {/* Subtle Romantic Photo Backdrop with dark overlay */}
        <div className="absolute inset-0 -z-10 opacity-25">
          <Image
            src={STORY_CONFIG.assets.images.parchment}
            alt="Ce jour-là"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C060E] via-[#2A0B14]/90 to-[#19050C]" />
        </div>

        {/* Vintage Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D6B77A]/30 bg-[#250811]/70 mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#D6B77A]" />
            <span className="text-[11px] font-serif tracking-[0.25em] text-[#D6B77A] uppercase">
              {STORY_CONFIG.event.symbolicDate}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FFF4E8] glow-rose-text">
            {thatDay.title}
          </h2>
        </div>

        {/* Progressive Paragraphs */}
        <div className="space-y-6 text-left">
          {thatDay.paragraphs.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.45, duration: 0.8 }}
              className="relative pl-6 sm:pl-8 border-l-2 border-[#D6B77A]/40 group hover:border-[#D6B77A] transition-colors"
            >
              {/* Golden diamond bullet point */}
              <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#D6B77A] ring-4 ring-[#20070F]" />

              <p className="font-serif text-base sm:text-xl text-[#FFF4E8]/90 font-light leading-relaxed">
                {p}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Button to Letter Screen */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        <button
          onClick={onNext}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#711F35] via-[#8C2442] to-[#711F35] text-[#FFF4E8] font-serif tracking-widest uppercase text-xs sm:text-sm border border-[#D6B77A]/50 shadow-[0_0_30px_rgba(113,31,53,0.5)] hover:shadow-[0_0_40px_rgba(214,183,122,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Mail className="w-4 h-4 text-[#D6B77A]" />
          <span>{thatDay.cta}</span>
          <ArrowRight className="w-4 h-4 text-[#D6B77A] group-hover:translate-x-1.5 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
