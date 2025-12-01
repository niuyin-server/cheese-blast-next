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
    className={`flex flex-col items-center space-y-1 text-white hover:text-gray-200 transition-colors drop-shadow-lg ${
      isActive ? activeColor : 'text-white'
    }`}
  >
    <div className="p-3 rounded-full bg-black/40 backdrop-blur-sm">
      <Icon size={24} className={isActive ? 'fill-current' : ''} />
    </div>
    <span className="text-xs font-semibold">{label}</span>
  </button>
);

export default ActionButton;

