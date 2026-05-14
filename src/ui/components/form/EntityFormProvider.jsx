import { FormProvider } from 'react-hook-form';
import { EntityFormShell } from './EntityFormShell';

export function EntityFormProvider({ form, children }) {
  return (
    <FormProvider {...form}>
      <EntityFormShell>
        {children}
      </EntityFormShell>
    </FormProvider>
  );
}