import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotify } from '@/ui/hooks/useNotify';

export function useToggleActive({ queryKey, mutationFn, notifications }) {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn,

    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueriesData({ queryKey });

      queryClient.setQueriesData(
        { queryKey, exact: false },
        (old, context) => {
          if (!old) return old;

          const key = context?.queryKey;
          const filters = key?.[1]?.filters || {};
          const currentIsActive = filters.isActive;

          let updatedItems = old.items.map((el) =>
            el.id === id ? { ...el, isActive: !el.isActive } : el
          );

          if (currentIsActive !== undefined) {
            updatedItems = updatedItems.filter(
              (el) => el.isActive === currentIsActive
            );
          }

          return {
            ...old,
            items: updatedItems,
          };
        }
      );

      return { previous };
    },

    onSuccess: (data, variables) => {
      const currentActiveState = data.data.data.isActive;
      const prevActiveState = variables?.isActive;

      if (prevActiveState && !currentActiveState) {
        notify.success(notifications.successDeactivate);
      } else {
        notify.success(notifications.successActivate);
      }
    },

    onError: (err, _vars, context) => {
      if (context?.previous) {
        context.previous.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }

      notify.error(notifications.requestError);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey, exact: false });
    },
  });
}