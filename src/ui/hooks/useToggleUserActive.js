import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleUserActive } from '@/domain/user/user.mutations';
import { useNotify } from '@/ui/hooks/useNotify';

export function useToggleUserActive(queryKey) {
  const queryClient = useQueryClient();
  const notify = useNotify();

  return useMutation({
    mutationFn: ({ id, isActive }) => toggleUserActive({ id, isActive }),

    onMutate: async ({ id, isActive }) => {

      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueriesData({ queryKey });

      queryClient.setQueriesData({ queryKey, exact: false, }, (old, context) => {
        if (!old) return old;
        
        const queryKey = context?.queryKey;
        const filters = queryKey?.[1]?.filters || {};
        const currentIsActive = filters.isActive;

        let updatedItems = old.items.map((el) =>
          el.id === id ? { ...el, isActive: !isActive } : el
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
      });

      return { previous };
    },

    onError: (err, _vars, context) => {
      if (context?.previous) {
        context.previous.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }

      console.log('ERR:', err);

      notify.error(
        err?.response?.data?.message || 'Error updating user status'
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey, exact: false });
    },
  });
}