import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatBytes } from '@/lib/utils';
import { VideoFileProps } from '@/types/types';

export default function VideoStatusTable(props: VideoFileProps) {
  const { videoFile } = props;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NAME</TableHead>
          <TableHead>SIZE</TableHead>
          <TableHead>STATUS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{videoFile.name.slice(0, 10) + '...'}</TableCell>
          <TableCell>{formatBytes(videoFile.size)}</TableCell>
          <TableCell>Click submit</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
