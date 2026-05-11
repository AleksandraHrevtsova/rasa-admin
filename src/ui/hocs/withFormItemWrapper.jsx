import { ErrorMessage } from '@/ui/components/form/fields/ErrorMessage';
import { formItemTypes, fieldTypes } from '@/config/constants';

const { checkbox, radio } = formItemTypes.input;
const INLINE_TYPES = [checkbox, radio];

const withFormItemWrapper = (Component) => {
  const Wrapped = (props) => {
    const { data, errors = {} } = props;
    const error = errors?.[data?.name];

    if (!data) return null;

    const isInline = INLINE_TYPES.includes(data.type);
    const isGroup = data.variant === fieldTypes.group;

    return (
      <div className='mt-2'>
        {/* GROUP TITLE */}
        {isGroup && data.groupLabel && (
          <div className='mb-2 text-m font-medium text-gray-700'>
            {data.groupLabel}
          </div>
        )}

        {/* NORMAL LABEL */}
        {!isInline && !isGroup && (
          <label className='block text-sm mb-1'>
            {data.label}
            {(data.required || data.validation) && (
              <span className='text-red-500 ml-1'>*</span>
            )}
          </label>
        )}

        <Component {...props} />

        {data.type !== formItemTypes.select && (
          <ErrorMessage error={error} />
        )}
      </div>
    );
  };

  return Wrapped;
};

export default withFormItemWrapper;