export type VideoFileState = {
  video: File | string | undefined;
  videoDuration: number;
  setVideo: (videoFile: File | string | undefined) => void;
  setVideoDuration: (duration: number) => void;
  reset: () => void;
};

export type VideoSplittingSettings = {
  chunkDuration: string | undefined;
  setChunkDuration: (duration: string) => void;
  sessionId: string | undefined;
  setSessionId: (id: string) => void;
  chunksMap: Map<number, number> | undefined;
  setChunksMap: (chunksMap: Map<number, number>) => void;
  reset: () => void;
};

export type VideoStorageState = {
  uploadedVideoUrl: string | undefined;
  setUploadedVideoUrl: (url: string) => void;
  isTakingLongToUpload: boolean;
  setIsTakingToLongToUpload: () => void;
  chunkUrls: string[];
  setChunkUrls: (urls: string[]) => void;
};
