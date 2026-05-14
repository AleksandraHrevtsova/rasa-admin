import { styleTokens } from '@/ui/tokens/form.tokens';

export function FormFieldLabel({ label, required = false, className = '' }) {
  if (!label) return null;

  return (
    <div className={`${styleTokens.fieldLabel} ${className}`}>
      {label}

      {required && (
        <span className={styleTokens.fieldError}>*</span>
      )}
    </div>
  );
}

export const InsideInputLabel = (label) => (
  <span className={styleTokens.inlineControlText}>
    {label}
  </span>
);