import {
  formItemTypes,
  compositeTypes,
} from '@/config/constants';

import { ControllerField } from '@/ui/components/form/ControllerField';

import { WrappedInput } from '@/ui/components/form/fields/Input';
import { WrappedSelect } from '@/ui/components/form/fields/Select';

import { managerComponents } from '@/ui/components/form/composites/form.managers';

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

export const fieldRenderers = {
  [compositeTypes.group]: renderGroup,
  [compositeTypes.grid]: renderGrid,
  [compositeTypes.row]: renderRow,
  [compositeTypes.manager]: renderManager,

  [formItemTypes.select]: renderSelect,

  default: renderInput,
};

function renderGroup(ctx) {
  const { node, renderChildren } = ctx;

  return (
    <div className='mb-6'>
      {node.label && (
        <div className='text-m font-semibold mb-3'>
          {node.label}
        </div>
      )}

      <div className='flex flex-col gap-3'>
        {renderChildren(node.children)}
      </div>
    </div>
  );
}

function renderGrid(ctx) {
  const { node, renderNode } = ctx;

  return (
    <div
      className={`grid ${gridCols[node.columns || 1]} gap-3 items-start`}
    >
      {node.children?.map((child, idx) => (
        <div key={child.name || idx} className={colSpans[child.span || 1]}>
          {renderNode(child)}
        </div>
      ))}
    </div>
  );
}

function renderRow(ctx) {
  const { node, renderChildren } = ctx;

  return (
    <div className='grid grid-cols-2 gap-3'>
      {renderChildren(node.children)}
    </div>
  );
}

function renderManager(ctx) {
  const {
    node,
    control,
    rules,
    derived,
    isEdit,
  } = ctx;

  const ManagerComponent = managerComponents[node.component];

  if (!ManagerComponent) return null;

  // readonly manager
  if (!node.name) {
    return (
      <ManagerComponent
        node={node}
        derived={derived}
        isEdit={isEdit}
      />
    );
  }

  return (
    <ControllerField
      control={control}
      name={node.name}
      rules={rules?.[node.name]}
      render={({ field, fieldState }) => (
        <ManagerComponent
          node={node}
          field={field}
          fieldState={fieldState}
          derived={derived}
          isEdit={isEdit}
        />
      )}
    />
  );
}

function renderSelect(ctx) {
  const {
    node,
    control,
    rules,
    derived,
  } = ctx;

  return (
    <ControllerField
      control={control}
      name={node.name}
      rules={rules?.[node.name]}
      render={({ field, fieldState }) => (
        <WrappedSelect
          field={field}
          fieldState={fieldState}
          data={node}
          options={derived?.options?.[node.name] || []}
          isDisabled={node.isDisabled}
        />
      )}
    />
  );
}

function renderInput(ctx) {
  const {
    node,
    register,
    rules,
    errors,
  } = ctx;

  return (
    <WrappedInput
      register={register}
      data={node}
      rules={rules?.[node.name]}
      errors={errors}
    />
  );
}