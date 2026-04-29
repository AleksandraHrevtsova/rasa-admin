import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNotify } from '@/ui/hooks/useNotify';
import { useQueryClient } from '@tanstack/react-query';
import { useConfirm } from '@/ui/components/confirm/ConfirmProvider';

export function useEntityForm({
  id,
  queryKey,
  getById,
  create,
  update,
  activate,
  deactivate,
  notifications,
  mapFromApi,
  mapToApi,
  onSuccess,
  compareValues,
}) {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const confirm = useConfirm();

  const isEdit = Boolean(id);

  const form = useForm({ mode: 'onChange' });

  const {
    control,
    formState: { isValid },
    setError,
    handleSubmit,
    reset,
  } = form;

  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const initialValuesRef = useRef(null);
  const values = useWatch({ control });

  const isFormChanged = useMemo(() => {
    if (!initialValuesRef.current) return false;

    if (compareValues) {
      return !compareValues(values, initialValuesRef.current);
    }

    return JSON.stringify(values) !== JSON.stringify(initialValuesRef.current);
  }, [values, compareValues]);

  const refresh = useCallback(async () => {
    if (!id) return;

    const { data } = await getById(id);
    const mapped = mapFromApi(data);

    initialValuesRef.current = mapped;
    setIsActive(data.isActive);
    reset(mapped);
  }, [id]);

  useEffect(() => {
    if (!isEdit) return;

    let ignore = false;

    const fetchItem = async () => {
      setLoading(true);

      try {
        const { data } = await getById(id);
        if (ignore) return;

        const mapped = mapFromApi(data);

        initialValuesRef.current = mapped;
        setIsActive(data.isActive);
        reset(mapped);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();

    return () => {
      ignore = true;
    };
  }, [id]);

  const onSubmit = async (values) => {
    console.log('onSubmit: isEdit & values', isEdit, values);
    try {
      const payload = mapToApi(values);
      console.log('payload', payload);

      if (isEdit) {
         console.log('update: payload', payload);

        await update(id, payload);
        notify.success(notifications.successUpdate);
      } else {
        console.log('create: payload', payload);

        await create(payload);
        notify.success(notifications.successCreate);
      }

      queryClient.invalidateQueries({ queryKey, exact: false });

      await refresh();

      onSuccess?.();

    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Error';

      if (msg.includes('Email')) {
        setError('email', { message: msg });
      }

      if (msg.includes('Phone')) {
        setError('phone', { message: msg });
      }
    }
  };

  const onError = (errs) => {
    const firstField = Object.keys(errs)[0];

    const el =
      document.querySelector(`[name='${firstField}']`) ||
      document.querySelector(`#${firstField}`);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  };

  const handleActivate = async () => {
    const prev = isActive;
    setIsActive(true);

    try {
      await activate(id);

      queryClient.invalidateQueries({ queryKey, exact: false });

      notify.success(notifications.successActivate);
    } catch (err) {
      setIsActive(prev);
    }
  };

  const handleDeactivate = async () => {
    const confirmed = await confirm({
      title: notifications.confirmDeactivateTitle,
      description: notifications.confirmDeactivateDesc,
    });

    if (!confirmed) return;

    const prev = isActive;
    setIsActive(false);

    try {
      await deactivate(id);

      queryClient.invalidateQueries({ queryKey, exact: false });

      notify.success(notifications.successDeactivate);
    } catch (err) {
      setIsActive(prev);
    }
  };

  return {
    form,
    handleSubmit,
    onSubmit,
    onError,
    loading,
    isEdit,
    isActive,
    isValid,
    isFormChanged,
    handleActivate,
    handleDeactivate,
  };
}