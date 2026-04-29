import Select from 'react-select';
import { Controller } from 'react-hook-form';
import withFormItemWrapper from '@/ui/hocs/withFormItemWrapper';
import { ErrorMessage } from '@/ui/components/form/fields/ErrorMessage';

const MySelect = (props) => {
  const { control, data, options, isDisabled, rules, onAfterChange } = props;

  function getValue(field) {
    const value = data.isMulti
    ? options?.filter((o) => field.value?.includes(o.value))
    : options?.find((o) => o.value === field.value) || null;
    return value;
  }

  const handleChange = (selected, field) => {
    let newValue;

    if (data.isMulti) {
      newValue = selected?.map((s) => s.value) || [];
    } else {
      newValue = selected ? selected.value : null;
    }

    field.onChange(newValue);
    onAfterChange?.(data.name, newValue);
  }

  if (!data?.name) return null;
  return (
    <Controller
      name={data.name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <Select
            {...field}
            id={data.name}
            name={data.name}
            value={getValue(field)}
            required={data.required}
            options={options}
            isClearable
            isMulti={data.isMulti}
            placeholder={data.placeholder}
            isDisabled={isDisabled}
            inputId={data.name}
            onChange={(s) => handleChange(s, field)}
            onBlur={field.onBlur}
            classNamePrefix={!!fieldState.error ? 'react-select-error' : 'react-select'}
          />
          <ErrorMessage error={fieldState.error}/>
        </>
      )}
    />
  );
};

export const WrappedSelect = withFormItemWrapper(MySelect);
