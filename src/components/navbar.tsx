import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function Navbar() {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <nav>
      <div className="flex items-center justify-between p-5">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl text-center sm:text-start cursor-pointer" onClick={refreshPage}>
          VidSplitter
        </h1>
        <ModeToggle />
      </div>
      <Separator />
    </nav>
  );
}
