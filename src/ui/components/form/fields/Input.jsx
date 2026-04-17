import withFormItemWrapper from '@/ui/hocs/withFormItemWrapper';

const Input = (props) => {
  const { register, data, errors = {}, rules } = props;
  const autoComplete = ['email', 'tel'].includes(data.type) ? data.type : 'off';
  
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