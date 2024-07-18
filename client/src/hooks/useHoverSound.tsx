import { useEffect, useRef } from "react";

export const useHoverSound = (soundUrl: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(soundUrl);
  }, [soundUrl]);

  const playSound = () => {
    audioRef.current?.play();
  };

  return playSound;
};
