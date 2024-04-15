import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getVideoDuration } from '@/utils/video';
import { raiseErrorToast } from '@/utils/utils';

type AddVideoUrlProps = {
  setVideoDuration: React.Dispatch<React.SetStateAction<number | undefined>>;
  setVideo: React.Dispatch<React.SetStateAction<File | string | undefined>>;
};

export default function AddVideoUrl(props: AddVideoUrlProps) {
  const { setVideo, setVideoDuration } = props;

  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  async function handleUrlSubmit() {
    try {
      if (!videoUrl) return;
      setIsButtonDisabled(true);
      setIsProcessing(true);
      const videoDuration = await getVideoDuration(videoUrl);
      setVideoDuration(videoDuration);
      setVideo(videoUrl);
    } catch (error) {
      raiseErrorToast('Failed to fetch video from the provided link, please try again with a valid link.', true);
      console.log(error);
    } finally {
      setVideoUrl(undefined);
      setIsProcessing(false);
      setIsButtonDisabled(false);
    }
  }

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      setVideoUrl(e.target.value);
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }

  return (
    <>
      <section className="flex flex-col gap-2 px-6">
        <h3 className="md:text-2xl text-xl font-semibold leading-none tracking-tight text-center md:text-start mt-10 mb-2">Or paste a video link</h3>
        <Input placeholder="https://example.com/video.mp4" type="url" onChange={handleValueChange} />
        <Button className="mt-4 mb-2" onClick={handleUrlSubmit} disabled={isButtonDisabled}>
          {isProcessing ? 'Processing...' : 'Submit URL'}
        </Button>
      </section>
    </>
  );
}
