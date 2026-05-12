import { formItemTypes, compositeTypes } from '@/config/constants';
import { WrappedInput } from '@/ui/components/form/fields/Input';
import { WrappedSelect } from '@/ui/components/form/fields/Select';

import { CheckboxListManager } from '@/ui/components/form/composites/CheckboxListManager';

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

const colSpans = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
};

export function EntityFormRenderer(props) {
  const { nodes } = props;

  if (!nodes) return null;

  return nodes.map((node, i) => (
    <NodeRenderer
      key={i}
      node={node}
      {...props}
    />
  ));
};

function NodeRenderer(props) {
  const { node, control } = props;

  // GROUP
  if (node.type === compositeTypes.group) {
    return (
      <div className='mb-6'>
        {node.label && (
          <div className='text-m font-semibold mb-3'>
            {node.label}
          </div>
        )}

        <div className='flex flex-col gap-3'>
          <EntityFormRenderer {...props} nodes={node.children} />
        </div>
      </div>
    );
  }

  // GRID
  if (node.type === compositeTypes.grid) {
    return (
      <div
        className={`grid ${gridCols[node.columns || 1]} gap-3 items-start`}>
        {node.children?.map((child, idx) => (
          <div key={idx} className={colSpans[child.span || 1]}>
            <NodeRenderer
              {...props}
              node={child}
            />
          </div>
        ))}
      </div>
    );
  }

   // GROUP CHECKBOX MANAGER
   if (
    node.type === compositeTypes.manager &&
    (node.component === 'paymentTypesManager' || node.component === 'productsManager')
  ) {
    return (
      <CheckboxListManager node={node} control={control} />
    );
  }

  // ROW
  if (node.type === compositeTypes.row) {
    return (
      <div className='grid grid-cols-2 gap-3'>
        <EntityFormRenderer
          {...props}
          nodes={node.children}
        />
      </div>
    );
  }

  // SELECT
  if (node.type === formItemTypes.select) {
    return (
      <WrappedSelect
        control={props.control}
        data={node}
        options={props.options[node.name]}
        isDisabled={node.isDisabled}
        rules={props.rules?.[node.name]}
        errors={props.errors}
      />
    );
  }

  // INPUT (default)
  return (
    <WrappedInput
      register={props.register}
      data={node}
      rules={props.rules?.[node.name]}
      errors={props.errors}
    />
  );
}