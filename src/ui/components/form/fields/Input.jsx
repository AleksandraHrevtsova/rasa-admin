import { useMemo } from 'react';
import { formItemTypes } from '@/config/constants';
import { parseNumber } from '@/core/utils/number.parser';
import { handleNumberKeyDown } from '@/ui/components/form/fields/number.input.helpers';
import withFormItemWrapper from '@/ui/hocs/withFormItemWrapper';
import { InsideInputLabel } from '@/ui/components/form/FormFieldLabel';
import { styleTokens } from '@/ui/tokens/form.tokens';

const getInputClassName = (hasError) =>
  `${styleTokens.inputBase} ${hasError ? styleTokens.inputError : ''}`;

const TextInput = ({ register, data, errors, rules }) => {
  const autoComplete =
    data.type === formItemTypes.input.email
      ? 'email'
      : data.type === formItemTypes.input.tel
        ? 'tel'
        : 'off';

  return (
    <input
      type={data.type || formItemTypes.input.text}
      {...register(data.name, rules)}
      id={data.name}
      placeholder={data.placeholder}
      autoComplete={autoComplete}
      disabled={data.isDisabled}
      className={getInputClassName(errors[data.name])}
    />
  );
};

const NumberInput = ({ register, data, errors, rules }) => {
  const inputParams = {
    min: data.inputParams?.min ?? 0,
    max: data.inputParams?.max ?? 100,
    step: data.inputParams?.step ?? 1,
  };

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
        disabled={data.isDisabled}
        className={getInputClassName(errors[data.name])}
      />
    </div>
  );
};

const InlineControl = ({ type, label, labelPosition = 'right', register, data, rules, errors }) => {
  return (
    <label className={styleTokens.inlineControlLabel}>
      {labelPosition === 'left' && (<InsideInputLabel label={label} />)}

      <input
        id={data.name}
        type={type}
        {...register(data.name, rules)}
        disabled={data.isDisabled}
        className={getInputClassName(errors[data.name])}
      />

      {labelPosition === 'right' && (<InsideInputLabel label={label} />)}
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
    <div className={styleTokens.groupControlContainer}>
      {data.options?.map((opt) => (
        <label
          key={opt.value}
          className={styleTokens.inlineControlLabel}
        >
          <input
            type={data.type}
            value={opt.value}
            {...register(data.name, rules)}
            className={getInputClassName(errors[data.name])}
          />

          <InsideInputLabel label={opt.label} />
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