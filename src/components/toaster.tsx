import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverProps } from '@/types/types';

export default function Toaster(props: PopoverProps) {
  return (
    <Popover>
      <PopoverTrigger className={props.className}>{<props.icon size={props.size} />}</PopoverTrigger>
      <PopoverContent align={'start'}>{props.message}</PopoverContent>
    </Popover>
  );
}
