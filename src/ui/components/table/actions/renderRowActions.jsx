import { ToggleActiveAction } from '@/ui/components/table/actions/ToggleActiveAction';
import { EditAction } from '@/ui/components/table/actions/EditAction';

export function renderRowActions(actions, context) {
  const { row, appUser, onConfirm, onToggle, onEdit } = context;

  return actions.map((action) => {
    const type = typeof action === 'string' ? action : action.type;

    switch (type) {
      case 'toggle': {
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
          <ToggleActiveAction
            key='toggle'
            row={row}
            isHidden={row.id === appUser?.id}
            onToggle={handleToggle}
          />
        );
      }

      case 'edit':
        return (
          <EditAction
            key='edit'
            row={row}
            onEdit={onEdit}
          />
        );

      default:
        return null;
    }
  });
}