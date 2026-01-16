import { useEffect, useRef, useState } from 'react';

const buildRecognizer = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const recog = new SpeechRecognition();
  recog.continuous = true;
  recog.interimResults = true;
  recog.lang = 'en-IN';
  return recog;
};

export const useWebSpeech = () => {
  const recognizerRef = useRef(null);
  const [supported, setSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const recog = buildRecognizer();
    if (recog) {
      recognizerRef.current = recog;
      setSupported(true);

      recog.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(' ');
        setText(transcript);
      };

      recog.onend = () => {
        setRecording(false);
      };
    }
  }, []);

  const start = () => {
    if (!recognizerRef.current || recording) return;
    setText('');
    recognizerRef.current.start();
    setRecording(true);
  };

  const stop = () => {
    if (!recognizerRef.current || !recording) return;
    recognizerRef.current.stop();
  };

  return { supported, recording, text, start, stop };
};
