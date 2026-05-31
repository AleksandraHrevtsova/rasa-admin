import Select from 'react-select';
import withFormItemWrapper from '@/ui/hocs/withFormItemWrapper';
import { ErrorMessage } from '@/ui/components/form/fields/ErrorMessage';

const MySelect = (props) => {
  const { field, fieldState, data, options, isDisabled } = props;

  if (!data?.name) return null;

  const isMulti = data.isMulti;

  const value = isMulti
    ? options?.filter(o => field.value?.includes(o.value))
    : options?.find(o => o.value === field.value) || null;

  const handleChange = (selected) => {
    const newValue = isMulti
      ? selected?.map((s) => s.value) || []
      : selected?.value ?? null;
  
    field.onChange(newValue);
  };

  return (
    <>
      <Select
        {...field}
        id={data.name}
        name={data.name}
        value={value}
        required={data.required}
        options={options}
        isClearable
        isMulti={isMulti}
        placeholder={data.placeholder}
        isDisabled={isDisabled}
        inputId={data.name}
        onChange={handleChange}
        onBlur={field.onBlur}
        classNamePrefix={fieldState?.error ? 'react-select-error' : 'react-select'}
      />
      <ErrorMessage error={fieldState.error}/>
    </>
  );
};

export const WrappedSelect = withFormItemWrapper(MySelect);
