// Web Audio API & Media Player Engine for "Un instant dans le temps"

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private isSynthesizingMusic = false;
  private synthInterval: number | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private hasUserInteracted: boolean = false;

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public registerUserInteraction() {
    this.hasUserInteracted = true;
    this.initContext();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.8, this.ctx.currentTime);
    }
    if (this.bgAudio) {
      this.bgAudio.muted = muted;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Clock tick / tock mechanical sound
  public playTick(isTock: boolean = false) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(isTock ? 780 : 920, now);
      filter.Q.setValueAtTime(8, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(isTock ? 340 : 420, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Audio fallback silent guard
    }
  }

  // Time travel rewind sound (swirling frequency warp & flutter)
  public playRewind() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 2.4;

      // Reverse pitch sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + duration);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + duration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.3);
      gain.gain.setValueAtTime(0.2, now + duration - 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);

      // Shimmering chimes during rewind
      for (let i = 0; i < 8; i++) {
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        const startTime = now + (i * duration) / 9;

        chimeOsc.type = "sine";
        chimeOsc.frequency.setValueAtTime(500 + i * 180, startTime);

        chimeGain.gain.setValueAtTime(0.001, startTime);
        chimeGain.gain.linearRampToValueAtTime(0.06, startTime + 0.02);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.25);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.masterGain);

        chimeOsc.start(startTime);
        chimeOsc.stop(startTime + 0.28);
      }
    } catch {
      // Audio fallback silent guard
    }
  }

  // Wax seal breaking & envelope opening
  public playEnvelopeOpen() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Wax crackle (short high-frequency noise burst)
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "highpass";
      noiseFilter.frequency.setValueAtTime(1400, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start(now);

      // 2. Paper slide / unfold sound (soft resonant tone)
      const paperOsc = this.ctx.createOscillator();
      const paperGain = this.ctx.createGain();
      paperOsc.type = "triangle";
      paperOsc.frequency.setValueAtTime(320, now + 0.05);
      paperOsc.frequency.exponentialRampToValueAtTime(180, now + 0.45);

      paperGain.gain.setValueAtTime(0.001, now + 0.05);
      paperGain.gain.linearRampToValueAtTime(0.12, now + 0.12);
      paperGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      paperOsc.connect(paperGain);
      paperGain.connect(this.masterGain);

      paperOsc.start(now + 0.05);
      paperOsc.stop(now + 0.48);
    } catch {
      // Silent guard
    }
  }

  // Magical romantic chime chord (for final reveal)
  public playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      // Warm chord: D4, F#4, A4, C#5, E5 (D major 9th - celestial and deeply emotional)
      const freqs = [293.66, 369.99, 440.0, 554.37, 659.25, 880.0];

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.08;
        const duration = 2.5;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12 - idx * 0.015, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      });
    } catch {
      // Silent guard
    }
  }

  // Play background romantic soundtrack
  public startBackgroundMusic(audioUrl?: string) {
    if (!this.hasUserInteracted) return;
    this.initContext();

    // Check if an external audio file is provided and playable
    if (audioUrl) {
      if (!this.bgAudio) {
        this.bgAudio = new Audio(audioUrl);
        this.bgAudio.loop = true;
        this.bgAudio.volume = this.isMuted ? 0 : 0.6;
      }
      this.bgAudio
        .play()
        .then(() => {
          // Playing custom audio file successfully
        })
        .catch(() => {
          // Fall back to built-in romantic ambient synthesizer
          this.startProceduralAmbient();
        });
      return;
    }

    this.startProceduralAmbient();
  }

  public pauseBackgroundMusic() {
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    this.stopProceduralAmbient();
  }

  // Generative dreamy romantic ambient soundtrack
  private startProceduralAmbient() {
    if (this.isSynthesizingMusic || this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isSynthesizingMusic = true;

    // Chord progressions: Dbmaj7 -> Bbm7 -> Gbmaj7 -> Abadd9 (Warm, deeply nostalgic & cinematic)
    const chords = [
      [138.59, 174.61, 207.65, 261.63], // Dbmaj7 (Db3, F3, Ab3, C4)
      [116.54, 138.59, 174.61, 207.65], // Bbm7 (Bb2, Db3, F3, Ab3)
      [92.5, 146.83, 185.0, 220.0],     // Gbmaj7 (Gb2, D4, F#3, A3)
      [103.83, 155.56, 207.65, 233.08], // Abadd9 (Ab2, Eb3, Ab3, Bb3)
    ];

    let currentChordIndex = 0;

    const playChord = () => {
      if (!this.isSynthesizingMusic || !this.ctx || !this.masterGain || this.isMuted) return;

      const chord = chords[currentChordIndex];
      currentChordIndex = (currentChordIndex + 1) % chords.length;
      const now = this.ctx.currentTime;
      const chordDuration = 5.5;

      chord.forEach((freq) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 2.0);
        gain.gain.linearRampToValueAtTime(0.035, now + chordDuration - 1.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + chordDuration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + chordDuration + 0.1);
      });
    };

    playChord();
    this.synthInterval = window.setInterval(playChord, 5200);
  }

  private stopProceduralAmbient() {
    this.isSynthesizingMusic = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const soundEngine = typeof window !== "undefined" ? new SoundEngine() : (null as unknown as SoundEngine);
