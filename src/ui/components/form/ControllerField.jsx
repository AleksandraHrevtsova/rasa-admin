import { Controller } from 'react-hook-form';

export function ControllerField({ control, name, defaultValue, rules, render }) {

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? []}
      rules={rules}
      render={({ field, fieldState }) => render({ field, fieldState })}
    />
  );
}