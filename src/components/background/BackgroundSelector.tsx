import { useSettingsStore } from '../../store/useSettingsStore';
import { BACKGROUNDS } from '../../data/constants';
import { useDeviceType } from '../../hooks/useDeviceType';

interface BackgroundSelectorProps {
  show: boolean;
  onClose: () => void;
}

export function BackgroundSelector({ show, onClose }: BackgroundSelectorProps) {
  const { background, setBackground } = useSettingsStore();
  const { isMobile } = useDeviceType();

  if (!show) return null;

  // Filter backgrounds based on device type
  const targetOrientation = isMobile ? 'vertical' : 'horizontal';
  const filteredBackgrounds = BACKGROUNDS.filter(bg => bg.orientation === targetOrientation);

  const handleSelect = (bgId: string) => {
    setBackground(bgId);
    onClose();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed bottom-20 right-4 bg-black/80 backdrop-blur-xl rounded-xl p-4 border border-white/10 w-80"
      role="dialog"
      aria-label="Background selector"
      onKeyDown={handleKeyDown}
    >
      <h3 className="text-white font-bold mb-3">Select Background</h3>
      <div className="grid grid-cols-2 gap-3" role="group" aria-label="Available backgrounds">
        {filteredBackgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => handleSelect(bg.id)}
            aria-label={`Select ${bg.name} background`}
            aria-pressed={background === bg.id}
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
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white text-xs font-medium">{bg.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
