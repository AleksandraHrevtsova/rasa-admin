import { ErrorMessage } from '../components/FormComponents';

const withFormItemWrapper = (Component) => {
  const WrappedComponent = (props) => {
    const { data, errors = {} } = props;
    const error = errors[data.name];
    
    if (!data) return null;
    return (
      <div className='mt-2'>
        <label className='block text-sm mb-1'>
          {data.label || data.placeholder}
          {data?.validation || data?.required && (<span className='text-red-500 ml-1'>*</span>)}
        </label>
        <Component {...props} />
        {data.type !== 'select' && <ErrorMessage error={error} />}
      </div>
    );
  };

  return WrappedComponent;
};

export default withFormItemWrapper;