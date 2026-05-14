import { useFormContext } from 'react-hook-form';
// TODO: effects={useUser/Counterparty/.../FormEffects}
export function EntityFormShell({ children }) {
  return (
    <div className="flex flex-col gap-4">
      {children}
    </div>
  );
}