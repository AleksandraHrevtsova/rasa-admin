import { FormFieldLabel } from '@/ui/components/form/FormFieldLabel';
import { styleTokens } from '@/ui/tokens/form.tokens';

export function FormFieldContainer({ label, required, action, children, className = '' }) {
  return (
    <div className={`${styleTokens.fieldWrapper} ${className}`}>
      {(label || action) && (
        <div className={styleTokens.actionLabelWrapper}>
          <FormFieldLabel
            label={label}
            required={required}
          />

          {action}
        </div>
      )}

      {children}
    </div>
  );
}