import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatBytes } from '@/utils/utils';
import { useVideoStore } from '@/stores/video';

export default function VideoStatusTable() {
  const videoFile = useVideoStore((state) => state.video);
  const videoDuration = useVideoStore((state) => state.videoDuration);

  return (
    <>
      {videoFile instanceof File && (
        <Table className="mt-3">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Video</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b-2">
            <TableRow>
              <TableCell className="font-medium">{videoFile.name.length > 10 ? videoFile.name.slice(0, 10) + '...' : videoFile.name}</TableCell>
              <TableCell>{formatBytes(videoFile.size)}</TableCell>
              <TableCell>{`${videoDuration} sec`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  );
}
