import { WrappedInput } from './fields/Input';
import { WrappedSelect } from './fields/Select';

export function EntityFormFieldsRenderer({
  control,
  register,
  errors,
  fields,
  rules,
  options,
  onAfterChange,
}) {
  const inputTypes = ['text', 'email', 'tel', 'password'];
  return (
    <>
      {fields?.map(el => {
        if (!el.isShowField) return null;
        if (el.type === 'select') {
          return (
            <WrappedSelect
              key={el.name}
              control={control}
              data={el}
              options={options[el.name]}
              isDisabled={el.isDisabled}
              rules={rules[el.name]}
              errors={errors[el.name]}
              onAfterChange={onAfterChange}
            />
          );
        }
        if (inputTypes?.includes(el.type)) {
          return (
            <WrappedInput 
              key={el.name}
              register={register} 
              data={el} 
              rules={rules[el.name]}
              errors={errors[el.name]}
            />
          );
        }
      })}
    </>
  );
}

