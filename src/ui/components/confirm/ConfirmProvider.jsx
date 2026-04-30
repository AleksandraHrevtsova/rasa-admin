import { createContext, useContext, useState, useCallback } from 'react';
import { ConfirmDialog } from '@/ui/components/confirm/ConfirmDialog';
import { useI18n } from '@/ui/hooks/useI18n';

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);
  const { t } = useI18n();

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setState({
        ...options,
        resolve,
      });
    });
  }, []);

  const handleClose = useCallback(() => setState(null), []);

  const handleConfirm = useCallback(() => {
    state?.resolve(true);
    handleClose();
  }, [state, handleClose]);

  const handleCancel = useCallback(() => {
    state?.resolve(false);
    handleClose();
  }, [state, handleClose]);

  const resolvedTitle = state?.titleKey
    ? t(state.titleKey)
    : state?.title;

  const resolvedDescription = state?.descriptionKey
    ? t(state.descriptionKey, state?.params || {})
    : state?.description;

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {state && (
        <ConfirmDialog
          open
          title={resolvedTitle}
          description={resolvedDescription}
          variant={state.variant}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);

  if (!ctx) {
    throw new Error('useConfirm must be used within ConfirmProvider');
  }

  return ctx;
}