export type VideoSplittingSettings = {
  chunkDuration: string | undefined;
  setChunkDuration: (duration: string) => void;
};

export type VideoStorageState = {
  chunkUrls: string[];
  setChunkUrls: (urls: string[]) => void;
};
