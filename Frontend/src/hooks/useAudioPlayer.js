import { useRef } from 'react';

export const useAudioPlayer = () => {
  const audioRef = useRef(new Audio());

  const playBase64 = (base64, mimeType = 'audio/mpeg', onEnd = () => {}) => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.src = `data:${mimeType};base64,${base64}`;
    audio.onended = onEnd;
    audio.play();
  };

  return { playBase64 };
};
