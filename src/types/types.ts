import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type VideoFileProps = {
  videoFile: File;
  videoDuration: number;
};

export type OptionsProps = {
  splitOptions: Map<number, number> | undefined;
};

export type PopoverProps = {
  message: string;
  icon: LucideIcon;
  size: number;
};

export type ContainerProps = {
  children: ReactNode;
};
