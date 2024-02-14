export type VideoFileState = {
  videoFile: File | undefined;
  videoDuration: number;
  setVideoFile: (videoFile: File | undefined) => void;
  setVideoDuration: (duration: number) => void;
};

export type VideoSplittingSettings = {
  chunkDuration: string | undefined;
  setChunkDuration: (duration: string) => void;
};
