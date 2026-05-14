import {
  Pencil,
  X,
  ShieldCheck,
  ShieldClose,
} from 'lucide-react';

import { buttonActionTypes } from '@/config/constants';
import { styleTokens } from '@/ui/tokens/form.tokens';

const icons = {
  [buttonActionTypes.edit]: Pencil,
  [buttonActionTypes.close]: X,
  [buttonActionTypes.activate]: ShieldCheck,
  [buttonActionTypes.deactivate]: ShieldClose,
};

export function IconAction({
  icon = buttonActionTypes.edit,
  onClick,
  title,
  size = 18,
  className = '',
  disabled = false,
}) {
  const Icon = icons[icon];

  if (!Icon) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${styleTokens.iconBtn} ${className}`}
    >
      <Icon size={size} />
    </button>
  );
}