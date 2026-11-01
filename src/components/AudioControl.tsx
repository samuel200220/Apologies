"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { soundEngine } from "@/lib/audio";
import { STORY_CONFIG } from "@/config/story";

export default function AudioControl() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && soundEngine) {
      setIsMuted(soundEngine.getMuted());
    }
  }, []);

  const handleToggle = () => {
    if (!soundEngine) return;
    soundEngine.registerUserInteraction();

    if (!isPlaying) {
      soundEngine.setMuted(false);
      soundEngine.startBackgroundMusic(STORY_CONFIG.assets.audio.bgMusic);
      setIsPlaying(true);
      setIsMuted(false);
    } else {
      const nextMuted = !isMuted;
      soundEngine.setMuted(nextMuted);
      setIsMuted(nextMuted);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={isMuted || !isPlaying ? "Activer l'ambiance sonore" : "Couper le son"}
        className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-bordeaux hover:border-[#D6B77A]/50 transition-all duration-300 shadow-lg hover:shadow-[#D6B77A]/10 active:scale-95"
      >
        <span className="relative flex items-center justify-center text-[#D6B77A]">
          {isMuted || !isPlaying ? (
            <VolumeX className="w-4 h-4 text-[#D6B77A]/70 group-hover:text-[#D6B77A] transition-colors" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#D6B77A] animate-pulse" />
          )}
        </span>

        {/* Animated equalizer waves when playing */}
        {isPlaying && !isMuted && (
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span className="w-0.5 bg-[#D6B77A] rounded-full animate-[bounce_1.2s_infinite_ease-in-out]" style={{ height: '60%' }} />
            <span className="w-0.5 bg-[#D6B77A] rounded-full animate-[bounce_0.8s_infinite_ease-in-out_0.2s]" style={{ height: '100%' }} />
            <span className="w-0.5 bg-[#D6B77A] rounded-full animate-[bounce_1.0s_infinite_ease-in-out_0.4s]" style={{ height: '40%' }} />
          </div>
        )}

        <span className="hidden sm:inline-block text-xs font-serif tracking-widest text-[#FFF4E8]/80 group-hover:text-[#FFF4E8] uppercase transition-colors">
          {isMuted || !isPlaying ? "Ambiance sonore" : "Musique"}
        </span>
      </button>
    </div>
  );
}
