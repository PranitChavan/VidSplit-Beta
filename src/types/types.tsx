import { LucideIcon } from 'lucide-react';

export type VideoFileProps = {
  videoFile: File;
};

export type OptionsProps = {
  splitOptions: Map<number, number> | undefined;
};

export type PopoverProps = {
  message: string;
  icon: LucideIcon;
  size: number;
};
