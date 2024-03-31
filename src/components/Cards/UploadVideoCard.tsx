import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from 'lucide-react';

export default function UploadVideoCard(props: { handleFile: Function; inputRef: React.RefObject<HTMLInputElement> }) {
  const { handleFile, inputRef } = props;

  return (
    <>
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
    </>
  );
}
