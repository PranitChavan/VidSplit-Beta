import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatBytes } from '@/utils/utils';
import { VideoFileProps } from '@/types/types';

export default function VideoStatusTable(props: VideoFileProps) {
  const { videoFile, videoDuration } = props;

  return (
    <Table className="mt-3">
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="text-white">Video</TableHead>
          <TableHead className="text-white">Size</TableHead>
          <TableHead className="text-white">Duration</TableHead>
          <TableHead className="text-white">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b-2">
        <TableRow>
          <TableCell className="font-medium">{videoFile.name.slice(0, 5) + '...'}</TableCell>
          <TableCell>{formatBytes(videoFile.size)}</TableCell>
          <TableCell>{`${videoDuration} sec`}</TableCell>
          <TableCell>Pending</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
