import React, { useRef } from 'react';
import { getVideoDuration, calcSplittingOptionsBasedOnVideoDuration, isVideoValid } from '@/utils/video';
import { raiseErrorToast } from '@/utils/utils';
import { useVideoSettings, useVideoStorageState, useVideoStore } from '@/stores/video';
import { useUploadVideoAndTriggerSplittingProcess } from '@/hooks/upload-video';
import useSplitVideo from '@/hooks/split-video';
import useGetVideoChunksUrlFromStorage from '@/hooks/get-video-chunks';
import { VideoUploadCardPostUploadProps } from '@/types/types';
import UploadVideoCard from './Cards/UploadVideoCard';
import VideoSplittingOptionsCard from './Cards/VideoSplittingOptionsCard';

export default function VideoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const video = useVideoStore((state) => state.video);
  const setVideo = useVideoStore((state) => state.setVideo);
  const setVideoDuration = useVideoStore((state) => state.setVideoDuration);
  const setSessionId = useVideoSettings((state) => state.setSessionId);
  const setUploadedVideoUrl = useVideoStorageState((state) => state.setUploadedVideoUrl);
  const setChunkUrls = useVideoStorageState((state) => state.setChunkUrls);
  const setChunksMap = useVideoSettings((state) => state.setChunksMap);
  const { mutateAsync: uploadVideo, status: uploadingVideoStatus } = useUploadVideoAndTriggerSplittingProcess();
  const { mutateAsync: splitVideo, status: videoSplittingStatus } = useSplitVideo();
  const { mutateAsync: getVideoChunksUrlsFromStorage, status: chunksUrlsGetStatus } = useGetVideoChunksUrlFromStorage();
  const isTakingLongToUpload = useVideoStorageState((state) => state.isTakingLongToUpload);

  const handleFile = async function (e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    let videoFile: File | undefined = e.target.files?.[0];

    if (!videoFile) {
      raiseErrorToast('Failed to upload your video please try again!', false, 'Uh oh! Something went wrong.', { label: 'Try again', inputRef: inputRef });
      return;
    }

    if (isVideoValid(videoFile, inputRef)) {
      try {
        const videoDuration = await getVideoDuration(videoFile);
        setVideoDuration(videoDuration);

        const chunksMap = calcSplittingOptionsBasedOnVideoDuration(videoDuration);
        setChunksMap(chunksMap);
      } catch (err) {
        raiseErrorToast('Failed to determine video duration, please try again!', false, 'Uh oh! Something went wrong.', { label: 'Try again', inputRef: inputRef });
        return;
      }
      setVideo(videoFile);
    } else {
      e.target.value = '';
    }
  };

  async function triggerVideoUploadSplitProcess() {
    const sessionId = crypto.randomUUID();
    setSessionId(sessionId);

    if (video instanceof File) {
      const uploadedVideoUrl = await uploadVideo(video!);
      setUploadedVideoUrl(uploadedVideoUrl);
      await splitVideo(uploadedVideoUrl);
    }

    if (typeof video === 'string') {
      await splitVideo(video);
    }

    const chunksUrls = await getVideoChunksUrlsFromStorage(sessionId);

    setChunkUrls(chunksUrls);
  }

  const videoUploadCardPostUploadProps: VideoUploadCardPostUploadProps = {
    triggerVideoUploadSplitProcess,
    uploadingVideoStatus,
    videoSplittingStatus,
    chunksUrlsGetStatus,
    isTakingLongToUpload,
  };

  return <>{video ? <VideoSplittingOptionsCard {...videoUploadCardPostUploadProps} /> : <UploadVideoCard handleFile={handleFile} inputRef={inputRef} />}</>;
}
