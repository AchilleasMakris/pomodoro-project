import { useEffect, useRef } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { BACKGROUNDS } from '../../data/constants';

export function VideoBackground() {
  const background = useSettingsStore((state) => state.background);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentBg = BACKGROUNDS.find((bg) => bg.id === background);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log('Autoplay prevented:', e));
    }
  }, [background]);

  if (!currentBg) return null;

  return (
    <>
      <video
        ref={videoRef}
        key={background}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src={currentBg.file}
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/30 -z-10" />
    </>
  );
}
