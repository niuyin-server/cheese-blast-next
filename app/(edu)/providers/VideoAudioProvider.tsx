'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type VideoAudioContextValue = {
  isMuted: boolean;
  toggleMute: () => void;
  setMuted: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
};

const VideoAudioContext = createContext<VideoAudioContextValue | null>(null);

type VideoAudioProviderProps = {
  children: ReactNode;
};

export const VideoAudioProvider = ({ children }: VideoAudioProviderProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.6); // 0 - 1

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleSetVolume = useCallback((value: number) => {
    const safeValue = Math.min(1, Math.max(0, value));
    setVolume(safeValue);
    // 当音量为 0 时自动静音，大于 0 时自动取消静音
    setIsMuted(safeValue === 0);
  }, []);

  const value = useMemo(
    () => ({
      isMuted,
      toggleMute,
      setMuted: setIsMuted,
      volume,
      setVolume: handleSetVolume,
    }),
    [isMuted, toggleMute, volume, handleSetVolume],
  );

  return <VideoAudioContext.Provider value={value}>{children}</VideoAudioContext.Provider>;
};

export const useVideoAudio = () => {
  const context = useContext(VideoAudioContext);
  if (!context) {
    throw new Error('useVideoAudio must be used within VideoAudioProvider');
  }
  return context;
};


