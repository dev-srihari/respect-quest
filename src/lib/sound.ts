type Tone = "tick" | "select" | "correct" | "wrong" | "start" | "finish";

const TONES: Record<Tone, { freq: number[]; duration: number }> = {
  tick: { freq: [880], duration: 0.04 },
  select: { freq: [660, 990], duration: 0.16 },
  correct: { freq: [660, 880, 1320], duration: 0.22 },
  wrong: { freq: [280, 200], duration: 0.24 },
  start: { freq: [440, 660, 880], duration: 0.25 },
  finish: { freq: [523, 659, 784, 1046], duration: 0.35 },
};

let ctx: AudioContext | null = null;

export function playTone(tone: Tone, enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  try {
    const AudioCtor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    ctx ??= new AudioCtor();
    if (ctx.state === "suspended") void ctx.resume();

    const { freq, duration } = TONES[tone];
    const step = duration / freq.length;
    freq.forEach((f, i) => {
      const osc = ctx!.createOscillator();
      const gain = ctx!.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      const start = ctx!.currentTime + i * step;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.06, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + step);
      osc.connect(gain).connect(ctx!.destination);
      osc.start(start);
      osc.stop(start + step + 0.02);
    });
  } catch {
    /* audio is optional */
  }
}
