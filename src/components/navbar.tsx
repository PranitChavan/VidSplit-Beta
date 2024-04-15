import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div className="flex items-center justify-between p-5">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl text-center sm:text-start cursor-pointer">
          <Link to="/">VidSplitter</Link>
        </h1>
        <ModeToggle />
      </div>
      <Separator />
    </nav>
  );
}
