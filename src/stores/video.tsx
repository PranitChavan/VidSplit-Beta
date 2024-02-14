import { create } from 'zustand';
import { VideoFileState } from '@/types/store.types';
import { VideoSplittingSettings } from '@/types/store.types';
import { devtools } from 'zustand/middleware';

export const useVideoStore = create<VideoFileState>((set) => ({
  videoFile: undefined,
  videoDuration: -1,
  setVideoFile: (videoFile: File | undefined) => set({ videoFile: videoFile }),
  setVideoDuration: (duration: number) => set({ videoDuration: duration }),
}));

export const useVideoSettings = create<VideoSplittingSettings, any>(
  devtools((set) => ({
    chunkDuration: undefined,
    setChunkDuration: (duration: string) => set({ chunkDuration: duration }),
  }))
);
