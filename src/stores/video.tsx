import { create } from 'zustand';
import { VideoFileState } from '@/types/store.types';
import { VideoSplittingSettings } from '@/types/store.types';
import { devtools } from 'zustand/middleware';

export const useVideoStore = create<VideoFileState, any>(
  devtools((set) => ({
    videoFile: undefined,
    videoDuration: -1,
    setVideoFile: (videoFile: File | undefined) => set({ videoFile: videoFile }),
    setVideoDuration: (duration: number) => set({ videoDuration: duration }),
    reset: () => set({ videoFile: undefined, videoDuration: -1 }),
  }))
);

export const useVideoSettings = create<VideoSplittingSettings, any>(
  devtools((set) => ({
    chunkDuration: undefined,
    setChunkDuration: (duration: string) => set({ chunkDuration: duration }),
    reset: () => set({ chunkDuration: undefined }),
  }))
);

// TODOS
// REMOVE DEVTOOLS
