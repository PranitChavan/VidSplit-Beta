import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from './ui/button';
import { useVideoStorageState } from '@/stores/video';

export default function VideoPreview() {
  const chunkUrls = useVideoStorageState((state) => state.chunkUrls);

  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-5 flex-wrap justify-center">
        {chunkUrls.map((url, idx) => {
          return (
            <Card className="w-[350px] mt-10" key={idx}>
              <CardContent className="pt-5">
                <div className="relative rounded-lg overflow-hidden aspect-[16/9]">
                  <span className="absolute inset-0 w-full h-full rounded-md bg-muted object-cover">
                    <video controls>
                      <source src={url} />
                    </video>
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <a href={url} download>
                  <Button className="w-full">Download</Button>
                </a>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
}
