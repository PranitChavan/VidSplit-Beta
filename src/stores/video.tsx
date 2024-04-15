import { create } from 'zustand';
import { VideoSplittingSettings, VideoStorageState } from '@/types/store.types';

export const useVideoSettings = create<VideoSplittingSettings>((set) => ({
  chunkDuration: undefined,
  setChunkDuration: (duration: string) => set({ chunkDuration: duration }),
}));

export const useVideoStorageState = create<VideoStorageState>((set) => ({
  chunkUrls: [],
  setChunkUrls: (urls: string[]) => set({ chunkUrls: urls }),
}));
