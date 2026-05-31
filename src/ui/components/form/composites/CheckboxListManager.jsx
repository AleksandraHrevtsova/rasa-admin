import { useState } from 'react';
import { FormFieldContainer } from '@/ui/components/form/FormFieldContainer';
import { IconAction } from '@/ui/components/table/actions/IconAction';
import { buttonActionTypes } from '@/config/constants';

export function CheckboxListManager({ node, field, isEdit }) {
  const [editMode, setEditMode] = useState(!isEdit);

  const toggleMode = () => setEditMode(prev => !prev);

  const selectedValues = field.value || [];
  const allValues = node.options?.map(opt => opt.value) || [];

  const isAllSelected =
    allValues.length > 0 &&
    allValues.every(v => selectedValues.includes(v));

  const handleToggleAll = (checked) => field.onChange(checked ? allValues : []);
  
  return (
    <FormFieldContainer
      label={node.label}
      required={node.required || node.validation}
      action={isEdit && (
        <IconAction
          type={editMode ? buttonActionTypes.close : buttonActionTypes.edit}
          onClick={toggleMode}
        />
      )}
    >
      {!editMode ? (
        <div className="flex flex-col gap-2">
          {node?.options
            ?.filter(opt => field.value?.includes(opt.value))
            ?.map(opt => (<div key={opt.value}>{opt.label}</div>))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {node.options?.length > 0 && (
            <label className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleToggleAll(e.target.checked)}
              />

              <span>Все</span>
            </label>
          )}
          {node.options?.map(opt => {
            const checked =
              field.value?.includes(opt.value);

            return (
              <label
                key={opt.value}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      field.onChange([ ...field.value, opt.value ]);
                    } else {
                      field.onChange(field.value.filter(v => v !== opt.value));
                    }
                  }}
                />

                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </FormFieldContainer>
  );
}