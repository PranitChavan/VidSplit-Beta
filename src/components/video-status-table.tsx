import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatBytes } from '@/utils/utils';
import { VideoFileProps } from '@/types/types';

export default function VideoStatusTable(props: VideoFileProps) {
  const { videoFile, videoDuration } = props;

  return (
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
  );
}
