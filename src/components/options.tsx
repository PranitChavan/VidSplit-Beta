import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OptionsProps } from '@/types/types';

export default function Options(props: OptionsProps) {
  const { splitOptions } = props;

  const splitOptionsArray = [...(splitOptions?.entries() || [])];

  const filteredPossibleChunks = splitOptionsArray.filter((data) => {
    const [_, chunk] = data;
    return chunk > 0;
  });

  function handleChange(selectedOption: string) {
    console.log(selectedOption);
  }

  return (
    <>
      <RadioGroup defaultValue="option-1" defaultChecked={true} onValueChange={(selectedOption: string) => handleChange(selectedOption)}>
        {filteredPossibleChunks.map((data, index) => {
          const [split, chunk] = data;
          const optionNum = index + 1;
          return (
            <div className={'flex items-center space-x-2'} key={optionNum}>
              <RadioGroupItem value={`option-${optionNum}`} id={`option-${optionNum}`} />
              <Label htmlFor={`option-${optionNum}`} className="text-lg">
                {`${split} Secs (${chunk} splits approx) `}
              </Label>
            </div>
          );
        })}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={`option-${filteredPossibleChunks.length + 1}`} id={`option-${filteredPossibleChunks.length + 1}`} />
          <Label htmlFor={`option-${filteredPossibleChunks.length + 1}`} className="text-lg">
            Custom
          </Label>
        </div>
      </RadioGroup>
    </>
  );
}
