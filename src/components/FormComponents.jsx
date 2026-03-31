import { Controller } from 'react-hook-form';
import Select from 'react-select';
import withFormItemWrapper from '../hocs/withFormItemWrapper';

const MySelect = (props) => {
  const { control, data, options, isDisabled, rules, errors } = props;

  return (
    <Controller
      name={data.name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Select
          {...field}
          options={options}
          isClearable
          isMulti={data.isMulti}
          placeholder={data.placeholder}
          isDisabled={isDisabled}
          inputId={data.name}
          classNamePrefix={errors[data.name] ? 'react-select-error' : 'react-select'}
        />
      )}
    />
  )
};
export const WrappedSelect = withFormItemWrapper(MySelect);

const Input = (props) => {
  const { register, data, errors, rules } = props;
  const autoComplete = ['email', 'tel'].includes(data.type) && data.type;

  return (
    <input
      type={data.type}
      {...register(data.name, rules)}
      placeholder={data.placeholder}
      autoComplete={autoComplete.toString()}
      className={`w-full p-2 border rounded ${
        errors[data.name] ? 'border-red-500' : ''
      }`}
    />
  );
};
export const WrappedInput = withFormItemWrapper(Input);

export const FormButton = ({ type, label, handleClick, isAccent }) => {
  const defaultStyles = 'border p-2 rounded w-full';
  const accentStyles = 'bg-blue-600 text-white ';
  const buttonStyle = isAccent ? accentStyles + defaultStyles : defaultStyles;
  return (
    <button
      type={type}
      onClick={handleClick}
      className={buttonStyle}
    >
      {label}
    </button>
  )
};
