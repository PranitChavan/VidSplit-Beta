import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { RefObject } from 'react';

const MAX_FILE_SIZE_LIMIT: number = 1.5e8; // In bytes (150 MB)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (!+bytes) return '0 Bytes';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function isVideoValid(file: File, inputRef: RefObject<HTMLInputElement>): boolean {
  const { size, type } = file;

  if (size > MAX_FILE_SIZE_LIMIT) {
    toast('Video file size limit', {
      description: `Video file that you uploaded is of size ${formatBytes(size)}, max allowed size is ${formatBytes(MAX_FILE_SIZE_LIMIT)}.`,
      action: {
        label: 'Try again',
        onClick: () => inputRef.current?.click(),
      },
    });
    return false;
  }

  if (!type.includes('video')) {
    toast('Invalid file type', {
      description: `Video file format that you uploaded is not supported.`,
      action: {
        label: 'Try again',
        onClick: () => inputRef.current?.click(),
      },
    });

    return false;
  }

  return true;
}
