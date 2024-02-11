import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

export default function TooltipInfo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon size={20} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Below options are decided by the duration of the uploaded video.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
