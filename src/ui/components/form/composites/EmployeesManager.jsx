import { Controller } from 'react-hook-form';

export function EmployeesManager({
  node,
  control,
}) {
  return (
    <Controller
      name={node.name}
      control={control}
      defaultValue={[]}

      render={({ field }) => {

        const employees = field.value || [];

        return (
          <div className="border rounded p-4">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">

              <div className="font-semibold">
                {node.label}
              </div>

              <button
                type="button"
                onClick={() => {

                  const newEmployee = {
                    id: crypto.randomUUID(),
                    name: `Employee ${employees.length + 1}`,
                    hub: 'Hub A',
                  };

                  field.onChange([
                    ...employees,
                    newEmployee,
                  ]);
                }}
                className="
                  border
                  rounded
                  px-2
                  py-1
                "
              >
                +
              </button>
            </div>

            {/* TABLE HEADER */}
            <div
              className="
                grid
                grid-cols-3
                gap-3
                font-medium
                border-b
                pb-2
                mb-2
              "
            >
              <div>Имя</div>
              <div>Склад</div>
              <div>Действие</div>
            </div>

            {/* ROWS */}
            <div className="flex flex-col gap-2">

              {employees.map((employee) => (
                <div
                  key={employee.id}
                  className="
                    grid
                    grid-cols-3
                    gap-3
                    items-center
                    border
                    rounded
                    px-3
                    py-2
                  "
                >
                  <div>
                    {employee.name}
                  </div>

                  <div>
                    {employee.hub}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {

                        field.onChange(
                          employees.filter(
                            x => x.id !== employee.id
                          )
                        );
                      }}
                      className="
                        border
                        rounded
                        px-2
                        py-1
                      "
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}