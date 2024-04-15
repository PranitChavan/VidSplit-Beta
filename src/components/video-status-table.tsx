import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatBytes } from '@/utils/utils';

type VideoStatusTableProps = {
  videoDuration: number;
  video: File | string | undefined;
};

export default function VideoStatusTable(props: VideoStatusTableProps) {
  const { video, videoDuration } = props;

  return (
    <>
      {video instanceof File && (
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
              <TableCell className="font-medium">{video.name.length > 10 ? video.name.slice(0, 10) + '...' : video.name}</TableCell>
              <TableCell>{formatBytes(video.size)}</TableCell>
              <TableCell>{`${videoDuration} sec`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  );
}
