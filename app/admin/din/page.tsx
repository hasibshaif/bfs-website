export default function DinPage() {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center p-4">
      <video
        src="/videos/din_layup.mov"
        controls
        className="max-w-full max-h-full object-contain"
        autoPlay
        muted
        loop
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
