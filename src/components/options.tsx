import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Options() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one" className="text-lg">
          15 Secs (4 splits approx)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two" className="text-lg">
          30 Secs (2 splits approx)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three" className="text-lg">
          60 Secs (2 splits approx)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-four" id="option-four" />
        <Label htmlFor="option-four" className="text-lg">
          Custom
        </Label>
      </div>
    </RadioGroup>
  );
}
