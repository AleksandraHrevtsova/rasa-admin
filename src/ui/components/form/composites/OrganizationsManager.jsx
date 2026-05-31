import { FormFieldContainer } from '@/ui/components/form/FormFieldContainer';

export function OrganizationsManager({
  node,
  field,
}) {
  return (
    <FormFieldContainer
      label={node.label}
      required={node.required || node.validation}
      action={null}
    >
      <div className="grid grid-cols-2 gap-6">

        {/* LEFT COLUMN */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <div className="font-medium">
              {node.leftTitle}
            </div>

            <button
              type="button"
              onClick={() => {

                const newOrg = {
                  id: crypto.randomUUID(),
                  name: `Organization ${organizations.length + 1}`,
                };

                field.onChange([
                  ...organizations,
                  newOrg,
                ]);
              }}
              className="border rounded px-2 py-1"
            >
              +
            </button>
          </div>

          <div className="flex flex-col gap-2">

            {organizations.map((org) => (
              <div
                key={org.id}
                className="flex items-center justify-between border rounded px-3 py-2">
                <div>
                  {org.name}
                </div>

                <button
                  type="button"
                  onClick={() => {field.onChange(organizations.filter(x => x.id !== org.id));}}
                  className="border rounded px-2 py-1">
                  -
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>

          <div className="font-medium mb-3">
            {node.rightTitle}
          </div>

          <div className="flex flex-col gap-2">

            {node.hubs?.map((hub) => (
              <div
                key={hub.id}
                className="border rounded px-3 py-2">
                {node.counterpartyName} + {hub.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormFieldContainer>
  );
}