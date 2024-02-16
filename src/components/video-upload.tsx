import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Options from '@/components/options';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { isVideoValid, getVideoDuration, calcSplittingOptionsBasedOnVideoDuration } from '@/lib/utils';
import { toast } from 'sonner';
import { InfoIcon, PlusIcon, Trash2Icon, Loader2 } from 'lucide-react';
import Toaster from '@/components/toaster';
import { useVideoSettings, useVideoStore } from '@/stores/video';
import { VideoStatus } from '@/types/enums';

export default function VideoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const splitChunkMap = useRef<Map<number, number>>();
  const setVideoFile = useVideoStore((state) => state.setVideoFile);
  const setVideoDuration = useVideoStore((state) => state.setVideoDuration);
  const videoFile = useVideoStore((state) => state.videoFile);
  const resetVideo = useVideoStore((state) => state.reset);
  const resetVideoSettings = useVideoSettings((state) => state.reset);

  const handleFile = async function (e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    let videoFile: File | undefined = e.target.files?.[0];

    if (!videoFile) {
      toast('Uh oh! Something went wrong.', {
        description: 'Failed to upload your video please try again!',
        action: {
          label: 'Try again',
          onClick: () => inputRef.current?.click(),
        },
      });
      return;
    }

    if (isVideoValid(videoFile, inputRef)) {
      try {
        const videoDuration = await getVideoDuration(videoFile);
        setVideoDuration(videoDuration);

        const chunksMap = calcSplittingOptionsBasedOnVideoDuration(videoDuration);
        splitChunkMap.current = chunksMap;
      } catch (err) {
        toast('Uh oh! Something went wrong.', {
          description: 'Failed to determine video duration, please try again!',
          action: {
            label: 'Try again',
            onClick: () => inputRef.current?.click(),
          },
        });
        return;
      }

      setVideoFile(videoFile);
    }
  };

  function deleteHandler() {
    resetVideo();
    resetVideoSettings();
  }

  // temp, imporve later
  function submitHandler() {}

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
              <Button className="mt-8 w-full md:w-auto" onClick={submitHandler}>
                {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                Submit
              </Button>
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
