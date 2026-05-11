import { formItemTypes } from '@/config/constants';
import { WrappedInput } from '@/ui/components/form/fields/Input';
import { WrappedSelect } from '@/ui/components/form/fields/Select';

export function EntityFormRenderer({
  nodes,
  control,
  register,
  errors,
  rules,
  options,
  setValue,
}) {
  if (!nodes) return null;

  return nodes.map((node, i) => (
    <NodeRenderer
      key={i}
      node={node}
      control={control}
      register={register}
      errors={errors}
      rules={rules}
      options={options}
      setValue={setValue}
    />
  ));
};

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

const colSpan = {
  1: 'col-span-1',
  2: 'col-span-2',
};

function NodeRenderer(props) {
  const { node } = props;

  // GROUP
  if (node.type === 'group') {
    return (
      <div className='mb-6'>
        {node.label && (
          <div className='text-sm font-semibold mb-2'>
            {node.label}
          </div>
        )}

        <div className='flex flex-col gap-3'>
          <EntityFormRenderer
            {...props}
            nodes={node.children}
          />
        </div>
      </div>
    );
  }

  // ROW
  if (node.type === 'row') {
    return (
      <div className='grid grid-cols-2 gap-3'>
        <EntityFormRenderer
          {...props}
          nodes={node.children}
        />
      </div>
    );
  }

  // GRID
  if (node.type === 'grid') {
    return (
      <div className={`${gridCols[node.columns] || 'grid-cols-2'} grid gap-3`}>
        {node.children.map((child, i) => (
          <div
            key={i}
            className={colSpan[child.span || 1] || 'col-span-1'}
          >
            <NodeRenderer {...props} node={child} />
          </div>
        ))}
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