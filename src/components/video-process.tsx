import React, { useRef, useState } from 'react';
import { getVideoDuration, isVideoValid } from '@/utils/video';
import { raiseErrorToast } from '@/utils/utils';
import { useVideoSettings, useVideoStorageState } from '@/stores/video';
import { VideoUploadCardPostUploadProps } from '@/types/types';
import VideoSelectCard from './Cards/VideoSelectCard';
import VideoSplittingOptionsCard from './Cards/VideoSplittingOptionsCard';
import { useMutation } from '@tanstack/react-query';
import { uploadVideoFileToStorage, splitVideo, getVideoChunksUrlFromStorage } from '@/services/video.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type VideoUploadProps = {
  setVideoDuration: React.Dispatch<React.SetStateAction<number | undefined>>;
  setVideo: React.Dispatch<React.SetStateAction<File | string | undefined>>;
  videoDuration: number | undefined;
  video: File | string | undefined;
};

const INFORM_USER_TO_REFRESH_TIME = 180000; // Milliseconds after user is informed to refresh the page

export default function VideoProcess(props: VideoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const setChunkUrls = useVideoStorageState((state) => state.setChunkUrls);
  const chunkDuration = useVideoSettings((state) => state.chunkDuration);
  const [isTakingLongToUpload, setIsTakingLongToUpload] = useState<boolean>(false);

  const navigate = useNavigate();

  const { setVideoDuration, videoDuration, setVideo, video } = props;

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
      } catch (err) {
        raiseErrorToast('Failed to determine video duration, please try again!', false, 'Uh oh! Something went wrong.', { label: 'Try again', inputRef: inputRef });
        return;
      }
      setVideo(videoFile);
    } else {
      e.target.value = '';
    }
  };

  const { mutateAsync: uploadVideo, status: uploadingVideoStatus } = useMutation({
    mutationFn: (vars: { video: File; sessionId: string }) => uploadVideoFileToStorage(vars.video, vars.sessionId),
    onMutate: () => {
      const informUser = setTimeout(() => {
        setIsTakingLongToUpload(true);
      }, INFORM_USER_TO_REFRESH_TIME);

      return informUser;
    },

    onError: () => {
      raiseErrorToast('Failed to upload video, please try again!', true);
    },

    onSettled: (_, __, ___, context) => {
      // __ is used to skip stuff which is not needed, dont think too much
      clearTimeout(context);
    },

    retry: 0,
  });

  const { mutateAsync: triggerSplitVideo, status: videoSplittingStatus } = useMutation({
    mutationFn: (vars: { uploadedVideoUrl: string; sessionId: string }) => splitVideo({ videoUrl: vars.uploadedVideoUrl, chunkDuration: chunkDuration!, sessionId: vars.sessionId }),
    retry: 0,
    onError: () => {
      raiseErrorToast('Failed to split your video, please try again!', true);
    },
  });

  const { mutateAsync: getVideoChunksUrlsFromStorage, status: chunksUrlsGetStatus } = useMutation({
    mutationFn: (sessionId: string) => getVideoChunksUrlFromStorage(sessionId, true),
    onError: () => {
      raiseErrorToast('Something went wrong, please try again!', true);
    },

    onSuccess: () => {
      toast.success('Video splitting successful! Please download the chunks using the download button.');
      navigate('/download');
    },
    retry: 0,
  });

  async function triggerVideoUploadSplitProcess() {
    const sessionId = crypto.randomUUID();

    if (sessionId && video instanceof File) {
      const uploadedVideoUrl = await uploadVideo({ video, sessionId: sessionId });
      await triggerSplitVideo({ uploadedVideoUrl, sessionId: sessionId });
    }

    if (typeof video === 'string') {
      await triggerSplitVideo({ uploadedVideoUrl: video, sessionId: sessionId });
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
    videoDuration,
  };

  return <>{video ? <VideoSplittingOptionsCard {...videoUploadCardPostUploadProps} /> : <VideoSelectCard handleFile={handleFile} inputRef={inputRef} />}</>;
}
