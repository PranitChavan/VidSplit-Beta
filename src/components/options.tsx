import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OptionsProps } from '@/types/types';
import { useVideoSettings, useVideoStore } from '@/stores/video';
import { Slider } from '@/components/ui/slider';
import { useEffect, useState } from 'react';
import { calcSplittingOptionsForCustomDuration } from '@/utils/video';

export default function Options(props: OptionsProps) {
  const [isCustomSelected, setIsCustomSelected] = useState<boolean>(false);
  const setChunkDuration = useVideoSettings((state) => state.setChunkDuration);
  const videoDuration = useVideoStore((state) => state.videoDuration);
  const chunkDuration = useVideoSettings((state) => state.chunkDuration);

  const { splitOptions } = props;
  const splitOptionsArray = [...(splitOptions?.entries() || [])];

  const filteredPossibleChunks = splitOptionsArray.filter((data) => {
    const [_, chunk] = data;
    return chunk > 0;
  });

  function handleRadioChange(selectedOption: string): void {
    if (selectedOption === 'Custom') {
      setIsCustomSelected(true);
      setChunkDuration(Math.floor(videoDuration / 2).toString());
      return;
    }
    setChunkDuration(selectedOption);
    setIsCustomSelected(false);
  }

  function handleSliderChange(e: number[]): void {
    setChunkDuration(e[0].toString());
  }

  useEffect(() => {
    if (filteredPossibleChunks.length) {
      const firstOption = filteredPossibleChunks[0][0].toString();
      setChunkDuration(firstOption);
    } else {
      setIsCustomSelected(true);
      setChunkDuration(Math.floor(videoDuration / 2).toString());
    }
  }, []);

  return (
    <>
      <RadioGroup defaultValue={filteredPossibleChunks.length > 0 ? filteredPossibleChunks[0][0].toString() : 'Custom'} defaultChecked={true} onValueChange={(selectedOption: string) => handleRadioChange(selectedOption)}>
        {filteredPossibleChunks.map((data, index) => {
          const [split, chunk] = data;
          const optionNum = index + 1;
          return (
            <div className={'flex items-center space-x-2'} key={optionNum}>
              <RadioGroupItem value={`${split}`} id={`option-${optionNum}`} />
              <Label htmlFor={`option-${optionNum}`} className="text-lg">
                {`${split} Secs (${chunk} splits approx) `}
              </Label>
            </div>
          );
        })}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={'Custom'} id={`option-${filteredPossibleChunks.length + 1}`} />
          <Label htmlFor={`option-${filteredPossibleChunks.length + 1}`} className="text-lg">
            Custom Split
          </Label>
        </div>
      </RadioGroup>

      <div className={isCustomSelected ? undefined : 'hidden'}>
        <Slider defaultValue={[videoDuration / 2]} max={videoDuration} step={1} min={1} className={`mt-6 md:w-1/2`} onValueChange={(e: number[]) => handleSliderChange(e)} />
        <p className="leading-7 [&:not(:first-child)]:mt-6">{`This video will be split around ${chunkDuration} seconds slices (${chunkDuration && calcSplittingOptionsForCustomDuration(videoDuration, parseInt(chunkDuration))} splits approx)`}</p>
      </div>
    </>
  );
}
