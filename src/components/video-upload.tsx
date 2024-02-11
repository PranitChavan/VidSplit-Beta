import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import VideoStatusTable from './video-status-table';
import Options from './options';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useRef, useState } from 'react';
import { isVideoValid, getVideoDuration, calcSplittingOptionsBasedOnVideoDuration } from '@/lib/utils';
import { toast } from 'sonner';
import { InfoIcon, PlusIcon } from 'lucide-react';
import TooltipInfo from './tooltip-info';

export default function VideoUpload() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const splitChunkMap = useRef<Map<number, number>>();

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
      const videoDuration = await getVideoDuration(videoFile);
      const chunksMap = calcSplittingOptionsBasedOnVideoDuration(videoDuration);
      splitChunkMap.current = chunksMap;
      setFile(videoFile);
    }
  };

  return (
    <Card className="border-2 border-slate-300 border-dashed  dark:border-gray-600 shadow-md">
      <div className={file && 'hidden'}>
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
      </div>

      <div className={file ? undefined : 'hidden'}>
        <CardHeader>
          <div className="flex flex-row gap-2 items-center">
            <CardTitle>Options</CardTitle>
            <TooltipInfo />
          </div>
          <CardDescription>Select options in which you want to split your video.</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-8">
          <Options splitOptions={splitChunkMap.current} />
          <Button className="mt-8 w-full md:w-auto">Submit</Button>
        </CardContent>

        <Separator />

        <CardFooter>{file && <VideoStatusTable videoFile={file} />}</CardFooter>
      </div>
    </Card>
  );
}
