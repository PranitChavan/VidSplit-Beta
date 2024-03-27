import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Options from '@/components/options';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { getVideoDuration, calcSplittingOptionsBasedOnVideoDuration, isVideoValid } from '@/utils/video';
import { raiseErrorToast } from '@/utils/utils';
import { InfoIcon, PlusIcon, Trash2Icon, Loader2, AlertTriangle } from 'lucide-react';
import Toaster from '@/components/toaster';
import { useVideoSettings, useVideoStorageState, useVideoStore } from '@/stores/video';
import { useUploadVideoAndTriggerSplittingProcess } from '@/hooks/upload-video';
import useSplitVideo from '@/hooks/split-video';
import useGetVideoChunksUrlFromStorage from '@/hooks/get-video-chunks';
import { RenderButtonTextProps } from '@/types/types';

export default function VideoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const splitChunkMap = useRef<Map<number, number>>();
  const videoFile = useVideoStore((state) => state.videoFile);
  const setVideoFile = useVideoStore((state) => state.setVideoFile);
  const setVideoDuration = useVideoStore((state) => state.setVideoDuration);
  const resetVideoStore = useVideoStore((state) => state.reset);
  const resetVideoSettings = useVideoSettings((state) => state.reset);
  const setSessionId = useVideoSettings((state) => state.setSessionId);
  const setUploadedVideoUrl = useVideoStorageState((state) => state.setUploadedVideoUrl);
  const isTakingLongToUpload = useVideoStorageState((state) => state.isTakingLongToUpload);
  const setChunkUrls = useVideoStorageState((state) => state.setChunkUrls);
  const { mutateAsync: uploadVideo, status: uploadingVideoStatus } = useUploadVideoAndTriggerSplittingProcess();
  const { mutateAsync: splitVideo, status: videoSplittingStatus } = useSplitVideo();
  const { mutateAsync: getVideoChunksUrlsFromStorage, status: chunksUrlsGetStatus } = useGetVideoChunksUrlFromStorage();

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
        splitChunkMap.current = chunksMap;
      } catch (err) {
        raiseErrorToast('Failed to determine video duration, please try again!', false, 'Uh oh! Something went wrong.', { label: 'Try again', inputRef: inputRef });
        return;
      }
      setVideoFile(videoFile);
    } else {
      e.target.value = '';
    }
  };

  function deleteHandler() {
    resetVideoStore();
    resetVideoSettings();
  }

  async function triggerVideoUploadSplitProcess() {
    const sessionId = crypto.randomUUID();
    setSessionId(sessionId);

    const uploadedVideoUrl = await uploadVideo(videoFile!);
    setUploadedVideoUrl(uploadedVideoUrl);

    await splitVideo(uploadedVideoUrl);

    const chunksUrls = await getVideoChunksUrlsFromStorage(sessionId);

    setChunkUrls(chunksUrls);
  }

  return (
    <>
      {videoFile ? (
        <>
          <Card className="border-2 border-slate-300 border-dashed  dark:border-gray-600 shadow-md mt-10">
            <CardHeader>
              <div className="flex flex-row gap-2 items-center">
                <CardTitle>Options</CardTitle>
                <Toaster className="flex-1" message="Below options are decided by the duration of the uploaded video." icon={InfoIcon} size={20} />
                <Button variant={'ghost'} onClick={deleteHandler}>
                  <Trash2Icon size={20} />
                </Button>
              </div>
              <CardDescription>Select options in which you want to split your video.</CardDescription>
            </CardHeader>

            <CardContent className="pt-2">
              <Options splitOptions={splitChunkMap.current} />
              <Button className="mt-8 w-full md:w-auto" onClick={triggerVideoUploadSplitProcess} disabled={uploadingVideoStatus === 'pending' || videoSplittingStatus === 'pending' || chunksUrlsGetStatus === 'pending' ? true : false}>
                <Loader2 className={`mr-2 h-4 w-4 animate-spin ${uploadingVideoStatus !== 'pending' && videoSplittingStatus !== 'pending' && 'hidden'}`} />
                {renderButtonText({ uploadingVideoStatus, videoSplittingStatus, chunksUrlsGetStatus })}
              </Button>
              <span className={`flex mt-5 gap-2 h-full items-center ${isTakingLongToUpload && uploadingVideoStatus === 'pending' ? '' : 'hidden'}`}>
                <AlertTriangle />
                <p className="leading-7 text-muted-foreground">Video is taking too long to upload, you can refresh the page and try again!</p>
              </span>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="border-2 border-slate-300 border-dashed  dark:border-gray-600 shadow-md mt-10">
          <CardHeader>
            <CardTitle>Upload your video</CardTitle>
            <CardDescription>Click the button below to select your video file</CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="hover:bg-muted/50">
            <label className=" rounded-lg w-full h-60 flex items-center justify-center transition-colors cursor-pointer" htmlFor="video">
              <PlusIcon />
              <span className="text-sm text-gray-500 dark:text-gray-400">Click here to select your video file</span>
              <input aria-describedby="video-help" className="sr-only" id="video" type="file" accept="video/*" onChange={(e) => handleFile(e)} ref={inputRef} />
            </label>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function renderButtonText({ uploadingVideoStatus, videoSplittingStatus, chunksUrlsGetStatus }: RenderButtonTextProps): string {
  if ((uploadingVideoStatus === 'idle' && videoSplittingStatus === 'idle' && chunksUrlsGetStatus === 'idle') || (uploadingVideoStatus === 'success' && videoSplittingStatus === 'success' && chunksUrlsGetStatus === 'success') || uploadingVideoStatus === 'error' || videoSplittingStatus === 'error' || chunksUrlsGetStatus === 'error') {
    return 'Submit';
  }

  if (uploadingVideoStatus === 'pending') {
    return 'Uploading';
  }

  if (videoSplittingStatus === 'pending' || chunksUrlsGetStatus === 'pending') {
    return 'Processing';
  }

  return '';
}
