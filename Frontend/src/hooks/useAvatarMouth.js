import { useEffect, useRef, useState } from 'react';

export const useAvatarMouth = () => {
  const [speaking, setSpeaking] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    clearInterval(intervalRef.current);
    setSpeaking(true);
    intervalRef.current = setInterval(() => {
      setSpeaking((prev) => !prev);
    }, 140);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSpeaking(false);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return { speaking, start, stop };
};
