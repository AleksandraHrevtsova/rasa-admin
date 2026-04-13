import { Controller } from 'react-hook-form';
import Select from 'react-select';
import withFormItemWrapper from '../hocs/withFormItemWrapper';

export const ErrorMessage = ({ error }) => {
  return (
    <>
      {error && (
        <p className='text-red-500 text-sm mt-1'>
          {error.message}
        </p>
      )}
    </>
  )
}

const MySelect = (props) => {
  const { control, data, options, isDisabled, rules, errors = {} } = props;

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
              options={options}
              isClearable
              isMulti={data.isMulti}
              placeholder={data.placeholder}
              isDisabled={isDisabled}
              inputId={data.name}
              onChange={(val) => {
                field.onChange(val);
              }}
          
              onBlur={field.onBlur}
              classNamePrefix={!!fieldState.error ? 'react-select-error' : 'react-select'}
            />
            <ErrorMessage error={fieldState.error}/>
          </>
        )
      }
    />
  );
};

export const WrappedSelect = withFormItemWrapper(MySelect);

const Input = (props) => {
  const { register, data, errors = {}, rules } = props;
  const autoComplete =['email', 'tel'].includes(data.type) ? data.type : 'off';
  
  if (!data?.name) return null;
  return (
    <input
      type={data.type || 'text'}
      {...register(data.name, rules)}
      placeholder={data.placeholder}
      autoComplete={autoComplete}
      className={`w-full p-2 border border-[#cccccc] rounded ${
        errors[data.name] ? 'border-red-500' : ''
      }`}
    />
  );
};

export const WrappedInput = withFormItemWrapper(Input);
