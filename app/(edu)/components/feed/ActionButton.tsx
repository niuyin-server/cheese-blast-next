'use client';

import { LucideIcon } from 'lucide-react';

type ActionButtonProps = {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  activeColor?: string;
};

const ActionButton = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  activeColor = 'text-white',
}: ActionButtonProps) => (
  <button
    onClick={onClick}
    className={`flex flex-col cursor-pointer items-center space-y-1 text-[var(--color-text-primary)] hover:text-white/80 transition-colors drop-shadow-lg ${
      isActive ? activeColor : 'text-white'
    }`}
  >
    <div className="p-3 rounded-full bg-[var(--color-action-icon-bg)] backdrop-blur-sm">
      <Icon size={24} className={isActive ? 'fill-current' : ''} />
    </div>
    <span className="text-xs font-semibold">{label}</span>
  </button>
);

export default ActionButton;

