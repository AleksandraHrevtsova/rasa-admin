import { useFormContext } from 'react-hook-form';
import { fieldRenderers } from '@/ui/components/form/form.renderers';

export function EntityFormRenderer(props) {
  const { fields } = props;

  const form = useFormContext();

  if (!fields?.length) return null;

  const renderNode = (node, index = 0) => {
    if (!node || node.isShowField === false) {
      return null;
    }

    const {
      control,
      register,
      formState: { errors },
    } = form;

    const renderer = fieldRenderers[node.type] || fieldRenderers.default;

    return (
      <div key={node.name || index}>
        {renderer({
          node,
          control,
          register,
          errors,
          rules: props.rules,
          derived: props.derived,
          isEdit: props.isEdit,
          renderNode,
          renderChildren: (children) => (<EntityFormRenderer {...props} fields={children} />),
        })}
      </div>
    );
  };

  return fields.map(renderNode);
}