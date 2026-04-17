import { formItemTypes } from "@/config/constants";
import { WrappedInput } from '@/ui/components/form/fields/Input';
import { WrappedSelect } from '@/ui/components/form/fields/Select';

export function EntityFormFieldsRenderer({
  control,
  register,
  errors,
  fields,
  rules,
  options,
  onAfterChange,
}) {
  return (
    <>
      {fields?.map((el, idx) => {
        if (!el.isShowField) return null;
        if (el.type === formItemTypes.select) {
          return (
            <WrappedSelect
              key={idx}
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
        if (Object.values(formItemTypes.input)?.includes(el.type)) {
          return (
            <WrappedInput 
              key={idx}
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

