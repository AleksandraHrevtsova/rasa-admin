import { useMemo } from 'react';
import { formItemTypes } from '@/config/constants';
import { parseNumber } from '@/core/utils/number.parser';
import { handleNumberKeyDown } from '@/ui/components/form/fields/number.input.helpers';
import withFormItemWrapper from '@/ui/hocs/withFormItemWrapper';

const baseInputClass = 'w-full p-2 border border-[#cccccc] rounded disabled:opacity-50 disabled:cursor-not-allowed';
const errorClass = 'border-red-500';

const getInputClassName = (hasError) =>
  `${baseInputClass} ${hasError ? errorClass : ''}`;

const TextInput = ({ register, data, errors, rules }) => {
  const { email, tel } = formItemTypes.input;
  const autoComplete = [email, tel].includes(data.type) ? data.type : 'off';

  return (
    <input
      type={data.type || formItemTypes.input.text}
      {...register(data.name, rules)}
      id={data.name}
      name={data.name}
      placeholder={data.placeholder}
      autoComplete={autoComplete}
      disabled={data.isDisabled}
      className={getInputClassName(errors[data.name])}
    />
  );
};

const NumberInput = ({ register, data, errors, rules }) => {
  const inputParams = useMemo(() => ({
      min: data.inputParams?.min ?? 0,
      max: data.inputParams?.max ?? 100,
      step: data.inputParams?.step ?? 1,
    }), [data.inputParams]);

  return (
    <input
      type={formItemTypes.input.number}
      inputMode='decimal'
      onKeyDown={handleNumberKeyDown}
      {...inputParams}
      {...register(data.name, {
        valueAsNumber: true,
        setValueAs: (v) => parseNumber(v),
        ...rules,
      })}
      id={data.name}
      name={data.name}
      placeholder={data.placeholder}
      disabled={data.isDisabled}
      className={getInputClassName(errors[data.name])}
    />
  );
};

const DateInput = ({ register, data, errors, rules }) => {
  return (
    <div className='relative'>
      <input
        type={formItemTypes.input.date}
        {...register(data.name, rules)}
        id={data.name}
        name={data.name}
        disabled={data.isDisabled}
        className={getInputClassName(errors[data.name])}
      />
    </div>
  );
};

const InputInsideLabel = (label) => (
  <span className='text-sm text-gray-700'>
    {label}
  </span>
);

const InlineControl = ({ type, label, labelPosition = 'right', register, data, rules }) => {
  return (
    <label className='flex items-center gap-2 cursor-pointer'>
      {labelPosition === 'left' && (<InputInsideLabel label={label} />)}

      <input
        id={data.name}
        name={data.name}
        type={type}
        {...register(data.name, rules)}
        value={data.value}
        disabled={data.isDisabled}
        className='h-4 w-4 cursor-pointer disabled:cursor-not-allowed'
      />

      {labelPosition === 'right' && (<InputInsideLabel label={label} />)}
    </label>
  );
};

const CheckboxInput = (props) => (
  <InlineControl
    {...props}
    type={formItemTypes.input.checkbox}
    label={props.data.label}
  />
);

const RadioInput = (props) => (
  <InlineControl
    {...props}
    type={formItemTypes.input.radio}
    label={props.data.label}
  />
);

const GroupControl = ({ data, register, rules }) => {
  return (
    <div className='flex flex-col gap-2'>
      {data.options?.map((opt) => (
        <label
          key={opt.value}
          className='flex items-center gap-2 cursor-pointer'
        >
          <input
            type={data.type}
            value={opt.value}
            {...register(data.name, rules)}
            className='h-4 w-4'
          />

          <InputInsideLabel label={opt.label} />
        </label>
      ))}
    </div>
  );
};

const inputComponents = {
  [formItemTypes.input.text]: TextInput,
  [formItemTypes.input.email]: TextInput,
  [formItemTypes.input.tel]: TextInput,
  [formItemTypes.input.password]: TextInput,
  [formItemTypes.input.number]: NumberInput,
  [formItemTypes.input.date]: DateInput,

  [formItemTypes.input.checkbox]: CheckboxInput,
  [formItemTypes.group.checkbox]: GroupControl,

  [formItemTypes.input.radio]: RadioInput,
  [formItemTypes.group.radio]: GroupControl,
};

const Input = (props) => {
  const { register, data, errors = {}, rules } = props;

  if (!data?.name) return null;

  const Component = inputComponents[data.type] || TextInput;

  return (
    <Component
      register={register}
      data={data}
      errors={errors}
      rules={rules}
    />
  );
};

export const WrappedInput = withFormItemWrapper(Input);