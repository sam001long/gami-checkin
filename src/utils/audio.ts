// 使用 Web Audio API 動態合成音效，免載 MP3
let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playPop = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) { console.warn(e); }
};

export const playSnap = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
    
    // 觸發手機震動 (如果支援)
    if (navigator.vibrate) navigator.vibrate(20);
  } catch (e) { console.warn(e); }
};

export const playWin = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    const time = audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C (勝利和弦)
    
    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gainNode.gain.setValueAtTime(0, time + index * 0.1);
      gainNode.gain.linearRampToValueAtTime(0.2, time + index * 0.1 + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, time + index * 0.1 + 0.3);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start(time + index * 0.1);
      osc.stop(time + index * 0.1 + 0.3);
    });

    if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
  } catch (e) { console.warn(e); }
};