import { ErrorMessage } from '@/ui/components/form/fields/ErrorMessage';
import { formItemTypes, compositeTypes } from '@/config/constants';
import { FormFieldContainer } from '@/ui/components/form/FormFieldContainer';

const { checkbox, radio } = formItemTypes.input;
const INLINE_TYPES = [checkbox, radio];

const withFormItemWrapper = (Component) => {
  const Wrapped = (props) => {
    const { data, errors = {} } = props;
    const error = errors?.[data?.name];

    if (!data) return null;

    const isInline = INLINE_TYPES.includes(data.type);
    const isGroup = data.variant === compositeTypes.group;

    return (
      <FormFieldContainer
        label={!isInline && !isGroup ? data.label : null}
        required={data.required || data.validation}
      >
        <Component {...props} />

        {data.type !== formItemTypes.select && (
          <ErrorMessage error={error} />
        )}
      </FormFieldContainer>
    );
  };

  return Wrapped;
};

export default withFormItemWrapper;