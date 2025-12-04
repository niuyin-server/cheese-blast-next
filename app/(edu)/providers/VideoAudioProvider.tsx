'use client';

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type VideoAudioContextValue = {
  isMuted: boolean;
  toggleMute: () => void;
  setMuted: (value: boolean) => void;
};

const VideoAudioContext = createContext<VideoAudioContextValue | null>(null);

type VideoAudioProviderProps = {
  children: ReactNode;
};

export const VideoAudioProvider = ({ children }: VideoAudioProviderProps) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isMuted,
      toggleMute,
      setMuted: setIsMuted,
    }),
    [isMuted, toggleMute],
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


