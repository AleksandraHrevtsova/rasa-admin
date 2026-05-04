import { useMemo } from 'react';
import { formItemTypes } from "@/config/constants";
import { parseNumber } from '@/core/utils/number.parser';
import { handleNumberKeyDown } from '@/ui/components/form/fields/number.input.helpers';
import withFormItemWrapper from '@/ui/hocs/withFormItemWrapper';

const Input = (props) => {
  const { register, data, errors = {}, rules } = props;
  const autoComplete = ['email', 'tel'].includes(data.type) ? data.type : 'off';
  
  const inputParams = useMemo(() => {
    if (data.type !== formItemTypes.input.number) return null;

    return {
      min: data.inputParams?.min ?? 0,
      max: data.inputParams?.max ?? 100,
      step: data.inputParams?.step ?? 1,
    };
  }, [data]);

  if (!data?.name) return null;

  const isNumber = data.type === formItemTypes.input.number;

  return (
    <input
      type={data.type || formItemTypes.input.text}
      inputMode={isNumber ? 'decimal' : undefined}
      onKeyDown={isNumber ? handleNumberKeyDown : undefined}
      {...inputParams}
      {...register(data.name, {
        ...(isNumber ? { 
          valueAsNumber: true,
          setValueAs: (v) => parseNumber(v),
        } : {}),
        ...rules,
      })}
      id={data.name}
      name={data.name}
      placeholder={data.placeholder}
      autoComplete={autoComplete}
      className={`w-full p-2 border border-[#cccccc] rounded ${
        errors[data.name] ? 'border-red-500' : ''
      }`}
    />
  );
};

export const WrappedInput = withFormItemWrapper(Input);