import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNotify } from './useNotify';

export function useEntityForm({
  id,
  getById,
  create,
  update,
  activate,
  deactivate,
  notifications,
  mapFromApi,
  mapToApi,
  onSuccess,
}) {
  const notify = useNotify();

  const isEdit = Boolean(id);

  const form = useForm({ mode: 'onChange' });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isDirty, isValid },
  } = form;

  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isEdit) return;

    let ignore = false;

    const fetchItem = async () => {
      setLoading(true);
      try {
        const { data } = await getById(id);
        if (ignore) return;

        setIsActive(data.isActive);

        reset(mapFromApi(data));
      } catch (err) {
        notify.error(err?.response?.data?.message || 'Error');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();

    return () => {
      ignore = true;
    };
  }, [id]);

  const refresh = async () => {
    const fresh = await getById(id);
    reset(mapFromApi(fresh.data));
  }

  const onSubmit = async (values) => {
    try {
      const payload = mapToApi(values);
      if (isEdit) {
        await update(id, payload);
        refresh();
        notify.success(notifications.successUpdate);
      } else {
        await create(payload);
        notify.success(notifications.successCreate);
      }
      onSuccess?.();
    } catch (err) {
      const msg = err?.response?.data?.message || 'Error';
      notify.error(msg);

      if (msg.includes('Email')) {
        setError('email', { message: msg });
      }

      if (msg.includes('Phone')) {
        setError('phone', { message: msg });
      }
    }
  };

  const onError = (errs) => {
    const firstErrorField = Object.keys(errs)[0];
    const el = document.querySelector(`[name='${firstErrorField}']`) || document.querySelector(`#${firstErrorField}`);
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
      notify.success(notifications.successActivate);
    } catch (err) {
      setIsActive(prev);
      notify.error(err.response?.data?.message);
    }
  };

  const handleDeactivate = async () => {
    const prev = isActive;
    const confirmed = window.confirm(notifications.confirmDeactivate);
    if (!confirmed) return;
    setIsActive(false);
    try {
      await deactivate(id);
      notify.success(notifications.successDeactivate);
    } catch (err) {
      setIsActive(prev);
      notify.error(err.response?.data?.message);
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
    isDirty,
    isValid,
    handleActivate,
    handleDeactivate,
  };
}