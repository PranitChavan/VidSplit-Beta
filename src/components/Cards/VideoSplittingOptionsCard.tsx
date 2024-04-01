import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Options from '@/components/options';
import { Button } from '@/components/ui/button';
import { InfoIcon, Trash2Icon, Loader2, AlertTriangle } from 'lucide-react';
import Toaster from '@/components/toaster';
import { useVideoSettings, useVideoStore } from '@/stores/video';
import { renderButtonText } from '@/utils/utils';
import { VideoUploadCardPostUploadProps } from '@/types/types';

export default function VideoSplittingOptionsCard(props: VideoUploadCardPostUploadProps) {
  const resetVideoStore = useVideoStore((state) => state.reset);
  const resetVideoSettings = useVideoSettings((state) => state.reset);
  const chunksMap = useVideoSettings((state) => state.chunksMap);

  const { triggerVideoUploadSplitProcess, uploadingVideoStatus, videoSplittingStatus, chunksUrlsGetStatus, isTakingLongToUpload } = props;

  function deleteHandler() {
    resetVideoStore();
    resetVideoSettings();
  }

  return (
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
          <Options splitOptions={chunksMap} />
          <Button className="mt-8 w-full md:w-auto" onClick={triggerVideoUploadSplitProcess} disabled={uploadingVideoStatus === 'pending' || videoSplittingStatus === 'pending' || chunksUrlsGetStatus === 'pending' ? true : false}>
            <Loader2 className={`mr-2 h-4 w-4 animate-spin ${uploadingVideoStatus !== 'pending' && videoSplittingStatus !== 'pending' && 'hidden'}`} />
            {renderButtonText({ uploadingVideoStatus, videoSplittingStatus, chunksUrlsGetStatus })}
          </Button>

          <p className={`leading-5 text-sm md:text-sm text-yellow-500 mt-5 ${videoSplittingStatus === 'pending' ? '' : 'hidden'}`}>Video splitting is in progress; it may take some time. You can switch tabs or minimize and come back later.</p>

          <span className={`flex mt-5 gap-2 h-full items-center ${isTakingLongToUpload && uploadingVideoStatus === 'pending' ? '' : 'hidden'}`}>
            <AlertTriangle />
            <p className="leading-7 text-muted-foreground">Video is taking too long to upload, you can refresh the page and try again!</p>
          </span>
        </CardContent>
      </Card>
    </>
  );
}
