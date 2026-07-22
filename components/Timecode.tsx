'use client';
import React, { useEffect, useRef } from 'react';

export default function Timecode() {
  const timecodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const fps = 24;
    const interval = setInterval(() => {
      frame++;
      const totalSeconds = Math.floor(frame / fps);
      const ff = (frame % fps).toString().padStart(2, '0');
      const ss = (totalSeconds % 60).toString().padStart(2, '0');
      const mm = (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, '0');
      const hh = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
      
      if (timecodeRef.current) {
        timecodeRef.current.textContent = `${hh}:${mm}:${ss}:${ff}`;
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      ref={timecodeRef} 
      className="font-mono text-[10px] md:text-xs tracking-widest text-stone-500 select-none"
    >
      00:00:00:00
    </span>
  );
}
