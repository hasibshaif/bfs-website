'use client';

import { useState } from 'react';

export default function DinPage() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_DIN_PASSWORD) {
      setIsUnlocked(true);
    } else {
      // Optional: Show error or shake animation
      setPassword('');
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center p-4 relative">
      {/* Video with conditional blur */}
      <video
        src="/videos/din_layup.mov"
        controls
        className={`max-w-full max-h-full object-contain transition-all duration-500 ${
          !isUnlocked ? 'blur-2xl' : ''
        }`}
        autoPlay
        muted
        loop
      >
        Your browser does not support the video tag.
      </video>

      {/* Password overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white/10 backdrop-blur-md rounded-lg p-8 shadow-2xl border border-white/20"
          >
            <h2 className="text-white text-2xl font-bold mb-4 text-center">
              Enter Password
            </h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="w-full mt-4 px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all border border-white/30"
            >
              Unlock
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
