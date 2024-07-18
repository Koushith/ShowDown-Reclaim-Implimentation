import { useState, useEffect, useRef } from "react";

export const useAudio = (url: string) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(new Audio(url));

  useEffect(() => {
    const audio = audioRef.current;

    const play = () => {
      setIsPlaying(true);
    };

    const pause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("play", play);
    audio.addEventListener("pause", pause);

    return () => {
      audio.removeEventListener("play", play);
      audio.removeEventListener("pause", pause);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return { isPlaying, togglePlayPause };
};
