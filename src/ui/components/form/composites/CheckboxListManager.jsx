import { useState } from 'react';
import { Controller } from 'react-hook-form';

export function CheckboxListManager({
  node,
  control,
}) {
  const [editMode, setEditMode] = useState(!node.isEdit);

  return (
    <div className="">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">
          {node.label}
        </div>

        {node.isEdit && (
          <button
            type="button"
            onClick={() => setEditMode(prev => !prev)}
            className="text-sm border px-2 py-1 rounded"
          >
            {editMode ? 'Закрыть' : 'Редактировать'}
          </button>
        )}
      </div>

      <Controller
        name={node.name}
        control={control}
        defaultValue={[]}
        render={({ field }) => {

          // READONLY MODE
          if (!editMode) {
            return (
              <div className="flex flex-col gap-2">
                {node.options
                  ?.filter(opt => field.value?.includes(opt.value))
                  ?.map(opt => (
                    <div key={opt.value}>
                      {opt.label}
                    </div>
                  ))}
              </div>
            );
          }

          // EDIT MODE
          return (
            <div className="flex flex-col gap-2">
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
                          field.onChange([
                            ...field.value,
                            opt.value,
                          ]);
                        } else {
                          field.onChange(
                            field.value.filter(
                              v => v !== opt.value
                            )
                          );
                        }
                      }}
                    />

                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
}