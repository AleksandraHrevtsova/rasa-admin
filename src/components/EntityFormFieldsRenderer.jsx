import { WrappedInput, WrappedSelect } from '../components/FormComponents';

export function EntityFormFieldsRenderer({
  control,
  register,
  errors,
  fields,
  rules,
  options,
  onAfterChange,
  watch,
}) {
  return (
    <>
      <WrappedSelect
        control={control}
        data={fields.role}
        options={options.roles}
        errors={errors}
      />

      {options.showClientFields && (
        <>
          <WrappedSelect
            control={control}
            data={fields.counterparty}
            options={options.counterparties}
            rules={rules.counterparty}
            errors={errors}
            onAfterChange={onAfterChange}
          />

          <WrappedSelect
            control={control}
            data={fields.hubs}
            options={options.hubs}
            rules={rules.hubs}
            errors={errors}
          />
        </>
      )}

      <WrappedInput register={register} data={fields.name} errors={errors} rules={rules.name} />
      <WrappedInput register={register} data={fields.phone} errors={errors} rules={rules.phone} />
      <WrappedInput register={register} data={fields.email} errors={errors} rules={rules.email} />

      {!options.isEdit && (
        <WrappedInput register={register} data={fields.password} errors={errors} rules={rules.password} />
      )}
    </>
  );
}

