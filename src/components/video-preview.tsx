import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from './ui/button';

export default function VideoPreview() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-5">
        <Card className="w-[350px] mt-10">
          <CardContent className="pt-5">
            <div className="relative rounded-lg overflow-hidden aspect-[16/9]">
              <span className="absolute inset-0 w-full h-full rounded-md bg-muted object-cover">
                <video controls>
                  <source src="https://dzumlefrjswpigwyshgx.supabase.co/storage/v1/object/public/Videos/VID-20240115-WA0063.mp4" />
                </video>
              </span>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">0:30</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full">Download</Button>
          </CardFooter>
        </Card>

        <Card className="w-[350px] mt-10">
          <CardContent className="pt-5">
            <div className="relative rounded-lg overflow-hidden aspect-[16/9]">
              <span className="absolute inset-0 w-full h-full rounded-md bg-muted object-cover">
                <video>
                  <source className="object-cover" src="https://dzumlefrjswpigwyshgx.supabase.co/storage/v1/object/public/Videos/VID-20240203-WA0001.mp4?t=2024-02-16T04%3A59%3A40.109Z" />
                </video>
              </span>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">0:30</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full">Download</Button>
          </CardFooter>
        </Card>

        <Card className="w-[350px] mt-10">
          <CardContent className="pt-5">
            <div className="relative rounded-lg overflow-hidden aspect-[16/9]">
              <span className="absolute inset-0 w-full h-full rounded-md bg-muted object-cover">
                <video>
                  <source className="object-cover" src="https://dzumlefrjswpigwyshgx.supabase.co/storage/v1/object/public/Videos/VID-20240203-WA0001.mp4?t=2024-02-16T04%3A59%3A40.109Z" />
                </video>
              </span>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">0:30</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full">Download</Button>
          </CardFooter>
        </Card>

        <Card className="w-[350px] mt-10">
          <CardContent className="pt-5">
            <div className="relative rounded-lg overflow-hidden aspect-[16/9]">
              <span className="absolute inset-0 w-full h-full rounded-md bg-muted object-cover">
                <video>
                  <source className="object-cover" src="https://dzumlefrjswpigwyshgx.supabase.co/storage/v1/object/public/Videos/VID-20240203-WA0001.mp4?t=2024-02-16T04%3A59%3A40.109Z" />
                </video>
              </span>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">0:30</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full">Download</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
