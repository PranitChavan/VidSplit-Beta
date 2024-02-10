import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import VideoStatusTable from './video-status-table';
import Options from './options';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useRef, useState } from 'react';
import { isVideoValid } from '@/lib/utils';
import { toast } from 'sonner';

export default function VideoUpload() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = function (e: React.ChangeEvent<HTMLInputElement>): void {
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
      setFile(videoFile);
    }
  };

  return (
    <Card className="border-2 border-slate-300 border-dashed  dark:border-gray-600">
      <div className={file && 'hidden'}>
        <CardHeader>
          <CardTitle>Upload your video</CardTitle>
          <CardDescription>Click the button below to select your video file</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="hover:bg-muted/50">
          <label className=" rounded-lg w-full h-60 flex items-center justify-center transition-colors cursor-pointer" htmlFor="video">
            <PlusIcon className="w-6 h-6" />
            <span className="text-sm text-gray-500 dark:text-gray-400">Click here to select your video file</span>
            <input aria-describedby="video-help" className="sr-only" id="video" type="file" accept="video/*" onChange={(e) => handleFile(e)} ref={inputRef} />
          </label>
        </CardContent>
      </div>

      <div className={file ? undefined : 'hidden'}>
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>Select options in which you want to split your video.</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-8">
          <Options />
          <Button className="mt-8 w-full md:w-auto">Submit</Button>
        </CardContent>

        <Separator />

        <CardFooter>{file && <VideoStatusTable videoFile={file} />}</CardFooter>
      </div>
    </Card>
  );
}

function PlusIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
