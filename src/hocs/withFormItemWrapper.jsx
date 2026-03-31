const withFormItemWrapper = (Component) => {
  const WrappedComponent = (props) => {
    const { data, errors } = props;
    return (
      <div>
        <label className="block text-sm mb-1">
          {data.label || data.placeholder}
          {data.validation?.required && (<span className="text-red-500 ml-1">*</span>)}
        </label>
        <Component {...props} />
        {errors[data.name] && (
          <p className="text-red-500 text-sm">
            {errors[data.name]?.message}
          </p>
        )}
      </div>
    );
  };

  return WrappedComponent;
};

export default withFormItemWrapper;