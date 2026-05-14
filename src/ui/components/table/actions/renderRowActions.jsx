import { buttonActionTypes } from '@/config/constants';
import { IconAction } from '@/ui/components/table/actions/IconAction';

export function renderRowActions(actions, context) {
  const { row, appUser, onConfirm, onToggle, onEdit } = context;

  return actions.map((action) => {
    const type = typeof action === 'string' ? action : action.type;

    switch (type) {
      case buttonActionTypes.toggle: {
        const handleToggle = async () => {
          if (action.confirm) {
            const config =
              typeof action.confirm === 'function'
                ? action.confirm(row)
                : action.confirm;
      
            const confirmed = await onConfirm(config);
            if (!confirmed) return;
          }

          onToggle(row);
        };

        return (
          <IconAction
            key={buttonActionTypes.toggle}
            icon={row.isActive ? buttonActionTypes.deactivate : buttonActionTypes.activate}
            disabled={row.id === appUser?.id}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          />
        );
      }

      case buttonActionTypes.edit:
        return (
          <IconAction
            icon={buttonActionTypes.edit}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(row);
            }}
          />
        );

      default:
        return null;
    }
  });
}