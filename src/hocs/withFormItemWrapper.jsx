const withFormItemWrapper = (Component) => {
  const WrappedComponent = (props) => {
    const { data, errors = {} } = props;
    const error = errors[data.name];
    
    if (!data) return null;
    return (
      <div>
        <label className="block text-sm mb-1">
          {data.label || data.placeholder}
          {data.validation?.required && (<span className="text-red-500 ml-1">*</span>)}
        </label>
        <Component {...props} />
        {error && (
          <p className="text-red-500 text-sm">
            {error.message}
          </p>
        )}
      </div>
    );
  };

  return WrappedComponent;
};

export default withFormItemWrapper;