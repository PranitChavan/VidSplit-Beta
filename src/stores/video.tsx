import { create } from 'zustand';
import { VideoFileState, VideoSplittingSettings, VideoStorageState } from '@/types/store.types';
import { devtools } from 'zustand/middleware';

export const useVideoStore = create<VideoFileState, any>(
  devtools((set) => ({
    video: undefined,
    videoDuration: -1,
    setVideo: (video: File | string | undefined) => set({ video: video }),
    setVideoDuration: (duration: number) => set({ videoDuration: duration }),
    reset: () => set({ video: undefined, videoDuration: -1 }),
  }))
);

export const useVideoSettings = create<VideoSplittingSettings, any>(
  devtools((set) => ({
    chunkDuration: undefined,
    sessionId: undefined,
    setChunkDuration: (duration: string) => set({ chunkDuration: duration }),
    setSessionId: (id: string) => set({ sessionId: id }),
    chunksMap: undefined,
    setChunksMap: (chunksMap: Map<number, number>) => set({ chunksMap: chunksMap }),
    reset: () => set({ chunkDuration: undefined, sessionId: undefined, chunksMap: undefined }),
  }))
);

export const useVideoStorageState = create<VideoStorageState, any>(
  devtools((set) => ({
    uploadedVideoUrl: undefined,
    isTakingLongToUpload: false,
    sessionId: undefined,
    chunkUrls: [],
    setUploadedVideoUrl: (url: string) => set({ uploadedVideoUrl: url }),
    setIsTakingToLongToUpload: () => set((state) => ({ isTakingLongToUpload: !state.isTakingLongToUpload })),
    setChunkUrls: (urls: string[]) => set({ chunkUrls: urls }),
  }))
);
