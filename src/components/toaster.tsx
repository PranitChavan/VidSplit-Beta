import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverProps } from '@/types/types';

export default function Toaster(props: PopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>{<props.icon size={props.size} />}</PopoverTrigger>
      <PopoverContent>{props.message}</PopoverContent>
    </Popover>
  );
}
