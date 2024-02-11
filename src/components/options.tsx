import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OptionsProps } from '@/types/types';

export default function Options(props: OptionsProps) {
  const { splitOptions } = props;

  const splitOptionsArray = [...(splitOptions?.entries() || [])];

  return (
    <>
      <RadioGroup defaultValue="option-one">
        {splitOptionsArray.map((data, index) => {
          const [split, chunk] = data;
          const optionNum = index + 1;
          return (
            <div className={`flex items-center space-x-2 ${!chunk && 'hidden'}`} key={optionNum}>
              <RadioGroupItem value={`option-${optionNum}`} id={`option-${optionNum}`} disabled={!Boolean(chunk)} />
              <Label htmlFor={`option-${optionNum}`} className="text-lg">
                {`${split} Secs (${chunk} splits approx) `}
              </Label>
            </div>
          );
        })}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={`option-${splitOptionsArray.length + 1}`} id={`option-${splitOptionsArray.length + 1}`} />
          <Label htmlFor={`option-${splitOptionsArray.length + 1}`} className="text-lg">
            {`Custom`}
          </Label>
        </div>
      </RadioGroup>
    </>
  );
}
