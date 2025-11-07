import { toast } from 'sonner';

interface GameToastProps {
  message: string;
}

export function GameToast({ message }: GameToastProps) {
  return (
    <div className="bg-gray-800 border-2 border-purple-500 rounded-lg p-4 text-white flex items-center space-x-4">
      <span className="text-2xl">🎮</span>
      <span>{message}</span>
    </div>
  );
}

export function showGameToast(message: string) {
  toast.custom(() => <GameToast message={message} />);
}
