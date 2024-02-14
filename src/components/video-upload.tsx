import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Options from '@/components/options';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { isVideoValid, getVideoDuration, calcSplittingOptionsBasedOnVideoDuration } from '@/lib/utils';
import { toast } from 'sonner';
import { InfoIcon, PlusIcon } from 'lucide-react';
import Toaster from '@/components/toaster';
import { useVideoStore } from '@/stores/video';

export default function VideoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const splitChunkMap = useRef<Map<number, number>>();
  const setVideoFile = useVideoStore((state) => state.setVideoFile);
  const setVideoDuration = useVideoStore((state) => state.setVideoDuration);
  const videoFile = useVideoStore((state) => state.videoFile);

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

  return (
    <>
      {videoFile ? (
        <>
          <Card className="border-2 border-slate-300 border-dashed  dark:border-gray-600 shadow-md">
            <CardHeader>
              <div className="flex flex-row gap-2 items-center">
                <CardTitle>Options</CardTitle>
                <Toaster message="Below options are decided by the duration of the uploaded video." icon={InfoIcon} size={20} />
              </div>
              <CardDescription>Select options in which you want to split your video.</CardDescription>
            </CardHeader>

            <CardContent className="pt-8">
              <Options splitOptions={splitChunkMap.current} />
              <Button className="mt-8 w-full md:w-auto">Submit</Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="border-2 border-slate-300 border-dashed  dark:border-gray-600 shadow-md">
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
