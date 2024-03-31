import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { RefObject } from 'react';
import { RenderButtonTextProps } from '@/types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function raiseErrorToast(errorDescription: string, asError: boolean = false, errorTitle?: string, action?: { label: string; inputRef: RefObject<HTMLInputElement> }): void {
  if (asError) {
    toast.error(errorDescription, {
      position: 'bottom-center',
    });
    return;
  }

  toast(errorTitle, {
    description: errorDescription,
    action: {
      label: action?.label,
      onClick: () => action?.inputRef.current?.click(),
    },
  });
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (!+bytes) return '0 Bytes';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function renderButtonText({ uploadingVideoStatus, videoSplittingStatus, chunksUrlsGetStatus }: RenderButtonTextProps): string {
  if ((uploadingVideoStatus === 'idle' && videoSplittingStatus === 'idle' && chunksUrlsGetStatus === 'idle') || (uploadingVideoStatus === 'success' && videoSplittingStatus === 'success' && chunksUrlsGetStatus === 'success') || uploadingVideoStatus === 'error' || videoSplittingStatus === 'error' || chunksUrlsGetStatus === 'error') {
    return 'Submit';
  }

  if (uploadingVideoStatus === 'pending') {
    return 'Uploading';
  }

  if (videoSplittingStatus === 'pending' || chunksUrlsGetStatus === 'pending') {
    return 'Processing';
  }

  return '';
}
