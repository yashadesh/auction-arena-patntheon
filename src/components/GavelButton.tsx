import React, { useState } from 'react';
import { Gavel, Volume2, VolumeX } from 'lucide-react';
import { soundFX } from '../utils/soundFX';

interface GavelButtonProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onHammer?: () => void;
}

export const GavelButton: React.FC<GavelButtonProps> = ({
  label = 'SOLD! (HAMMER)',
  size = 'md',
  className = '',
  onHammer,
}) => {
  const [isStriking, setIsStriking] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStriking(true);
    soundFX.playGavel();
    if (onHammer) onHammer();
    setTimeout(() => setIsStriking(false), 450);
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm sm:text-base font-extrabold gap-2.5',
  }[size];

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Strike the auction gavel (Simulates real auction hall hammer)"
      className={`inline-flex items-center justify-center font-black rounded-xl uppercase tracking-wider transition-all transform active:scale-95 shadow-md ${
        isStriking
          ? 'bg-amber-400 text-amber-950 scale-105 ring-4 ring-amber-400/50 shadow-amber-500/50'
          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 hover:shadow-amber-500/20'
      } ${sizeClasses} ${className}`}
    >
      <Gavel
        className={`transition-transform duration-200 ${
          isStriking ? '-rotate-45 scale-125' : 'rotate-0'
        } ${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`}
      />
      <span>{label}</span>
    </button>
  );
};

export const SoundToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [muted, setMuted] = useState(soundFX.getMuted());

  const handleToggle = () => {
    const isNowMuted = soundFX.toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      soundFX.playBid();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`p-2 rounded-xl transition border text-xs font-semibold flex items-center gap-1.5 ${
        muted
          ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
      } ${className}`}
      title={muted ? 'Unmute Auction Sounds (Gavel, Bids, Buzzers)' : 'Mute Auction Sounds'}
    >
      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      <span className="hidden sm:inline font-mono">{muted ? 'Muted' : 'Sound FX'}</span>
    </button>
  );
};
