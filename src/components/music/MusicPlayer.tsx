import { useState, useEffect, useRef } from 'react';
// @ts-ignore - No types available for react-howler
import ReactHowler from 'react-howler';
import { Play, Pause, SkipBack, SkipForward, Volume2, ImageIcon } from 'lucide-react';
import type { Track } from '../../types';
import { useSettingsStore } from '../../store/useSettingsStore';
import { R2_MUSIC_BASE_URL, BACKGROUNDS } from '../../data/constants';
import { useDeviceType } from '../../hooks/useDeviceType';
import lofiTracks from '../../data/lofi.json';
import synthwaveTracks from '../../data/synthwave.json';

interface MusicPlayerProps {
  playing: boolean;
  setPlaying: (playing: boolean) => void;
}

export function MusicPlayer({ playing, setPlaying }: MusicPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlistState, setPlaylistState] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const { isMobile } = useDeviceType();

  // Filter backgrounds based on device type
  const targetOrientation = isMobile ? 'vertical' : 'horizontal';
  const filteredBackgrounds = BACKGROUNDS.filter(bg => bg.orientation === targetOrientation);

  const playerRef = useRef<any>(null);
  const seekIntervalRef = useRef<number | undefined>(undefined);

  const musicVolume = useSettingsStore((state) => state.musicVolume);
  const setMusicVolume = useSettingsStore((state) => state.setMusicVolume);
  const background = useSettingsStore((state) => state.background);
  const setBackground = useSettingsStore((state) => state.setBackground);
  const playlist = useSettingsStore((state) => state.playlist);
  const setPlaylist = useSettingsStore((state) => state.setPlaylist);

  // Load and shuffle playlist
  useEffect(() => {
    const tracks = playlist === 'lofi' ? (lofiTracks as Track[]) : (synthwaveTracks as Track[]);
    const shuffled = [...tracks].sort(() => Math.random() - 0.5);
    setPlaylistState(shuffled);
    setCurrentIndex(0);
    if (shuffled.length > 0) {
      setCurrentTrack(shuffled[0]);
    }
  }, [playlist]);

  // Update seek position
  useEffect(() => {
    if (playing) {
      seekIntervalRef.current = window.setInterval(() => {
        if (playerRef.current) {
          setSeek(playerRef.current.seek() as number);
        }
      }, 100);
    } else {
      if (seekIntervalRef.current) {
        clearInterval(seekIntervalRef.current);
      }
    }

    return () => {
      if (seekIntervalRef.current) {
        clearInterval(seekIntervalRef.current);
      }
    };
  }, [playing]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % playlistState.length;
    setCurrentIndex(nextIndex);
    setCurrentTrack(playlistState[nextIndex]);
    setSeek(0);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? playlistState.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentTrack(playlistState[prevIndex]);
    setSeek(0);
  };

  const handleEnd = () => {
    handleNext();
  };

  const handleLoad = () => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration() as number);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    const newSeek = duration * percent;
    playerRef.current.seek(newSeek);
    setSeek(newSeek);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const getTrackUrl = (track: Track) => {
    if (track.file.startsWith('/r2-audio/')) {
      return `${R2_MUSIC_BASE_URL}${track.file.replace('/r2-audio', '')}`;
    }
    return track.file;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/10">
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-2 py-2' : 'px-4 py-3'}`}>
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-4'}`}>
          {/* Track Info */}
          <div className={`${isMobile ? 'w-full' : 'flex-1'} min-w-0`}>
            <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
              {/* Genre Badge */}
              <button
                onClick={() => setPlaylist(playlist === 'lofi' ? 'synthwave' : 'lofi')}
                className={`px-3 py-1 bg-purple-600 text-white ${isMobile ? 'text-xs' : 'text-sm'} font-medium rounded-full hover:bg-purple-700 transition-colors`}
              >
                {playlist === 'lofi' ? 'Lofi' : 'Synthwave'}
              </button>

              {currentTrack && (
                <div className="min-w-0">
                  <p className={`text-white ${isMobile ? 'text-xs' : 'text-sm'} font-medium truncate`}>
                    {currentTrack.title}
                  </p>
                  <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className={`flex items-center gap-2 ${isMobile ? 'justify-center w-full' : ''}`}>
            <button
              onClick={handlePrevious}
              className={`${isMobile ? 'p-3' : 'p-2'} text-white hover:bg-white/10 rounded-full transition-colors`}
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>

            <button
              onClick={handleNext}
              className={`${isMobile ? 'p-3' : 'p-2'} text-white hover:bg-white/10 rounded-full transition-colors`}
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className={`${isMobile ? 'w-full' : 'flex-1'} flex items-center gap-2`}>
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(seek)}</span>
            <div
              className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-white rounded-full transition-all group-hover:bg-purple-500"
                style={{ width: `${duration ? (seek / duration) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
          </div>

          {/* Volume & Background Selector */}
          <div className={`flex items-center gap-2 ${isMobile ? 'justify-end w-full' : ''}`}>
            {/* Volume Control */}
            <div className="relative group">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center gap-2"
              >
                <Volume2 size={20} />
                <span className={`text-xs w-8 ${isMobile ? 'hidden' : ''}`}>{musicVolume}%</span>
              </button>

              {/* Volume Slider Popup */}
              {showVolumeSlider && (
                <div className={`absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-xl rounded-lg p-4 border border-white/10 ${isMobile ? 'w-64' : 'w-48'}`}>
                  <div className="flex items-center gap-3">
                    <Volume2 size={16} className="text-gray-400" />
                    <div className="flex-1 relative">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white transition-all"
                          style={{ width: `${musicVolume}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={musicVolume}
                        onChange={(e) => setMusicVolume(Number(e.target.value))}
                        className="absolute inset-0 w-full h-2 appearance-none cursor-pointer bg-transparent
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-4
                          [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-white
                          [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:shadow-md
                          [&::-moz-range-thumb]:w-4
                          [&::-moz-range-thumb]:h-4
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:bg-white
                          [&::-moz-range-thumb]:border-0
                          [&::-moz-range-thumb]:cursor-pointer
                          [&::-moz-range-thumb]:shadow-md"
                      />
                    </div>
                    <span className="text-xs text-white w-8 text-right">{musicVolume}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Background Selector */}
            <button
              onClick={() => setShowBackgrounds(!showBackgrounds)}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <ImageIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Background Selector Popup */}
      <div className={`absolute bottom-full mb-2 bg-black/90 backdrop-blur-xl rounded-xl p-4 border border-white/10 ${isMobile ? 'left-4 right-4 max-w-sm mx-auto' : 'right-4 w-80'} ${showBackgrounds ? 'block' : 'hidden'}`}>
        <h3 className="text-white font-bold mb-3 text-sm">Select Background</h3>
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
          {filteredBackgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => {
                setBackground(bg.id);
                setShowBackgrounds(false);
              }}
              className={`relative rounded-lg overflow-hidden aspect-video border-2 transition-all ${
                background === bg.id
                  ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <img
                src={bg.poster}
                alt={bg.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-xs font-medium">{bg.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Audio Player */}
      {currentTrack && (
        <ReactHowler
          ref={playerRef}
          src={getTrackUrl(currentTrack)}
          playing={playing}
          volume={musicVolume / 100}
          onEnd={handleEnd}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
}
