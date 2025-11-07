import { useRef } from 'react';
// @ts-ignore - No types available for react-howler
import ReactHowler from 'react-howler';
import { AMBIENT_SOUNDS } from '../../data/constants';
import { useSettingsStore } from '../../store/useSettingsStore';

interface AmbientSoundsPlayerProps {
  musicPlaying: boolean;
}

export function AmbientSoundsPlayer({ musicPlaying }: AmbientSoundsPlayerProps) {
  const ambientVolumes = useSettingsStore((state) => state.ambientVolumes);
  const playerRefs = useRef<Record<string, any>>({});

  return (
    <>
      {AMBIENT_SOUNDS.map((sound) => {
        const volume = ambientVolumes[sound.id] || 0;
        const isPlaying = volume > 0 && musicPlaying;

        return (
          <ReactHowler
            key={sound.id}
            ref={(ref: any) => {
              if (ref) playerRefs.current[sound.id] = ref;
            }}
            src={sound.file}
            playing={isPlaying}
            volume={volume / 100}
            loop={true}
            html5={true}
          />
        );
      })}
    </>
  );
}
