import VideoUpload from './video-upload';

export default function Main() {
  return (
    <>
      <header>
        <h3 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight text-center sm:p-3 px-5 pt-7">Free video splitter for stories</h3>
        <p className="text-xl text-muted-foreground text-center p-3">Split lengthy videos into into stories! Best for Instagram, Whatsapp, Facebook, Snapchat & more. No watermark!</p>
      </header>
      <main>
        <div className="container mt-10">
          <VideoUpload />
        </div>
      </main>
    </>
  );
}
