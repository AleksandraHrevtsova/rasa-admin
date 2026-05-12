import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { submitActions } from '@/config/constants';
import { useNotify } from '@/ui/hooks/useNotify';
import { useQueryClient, useQuery } from '@tanstack/react-query';
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
  const onConfirm = useConfirm();

  const [isActive, setIsActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const initialValuesRef = useRef(null);
  const submitRef = useRef(submitActions.save);
  const abortRef = useRef(false);
  
  const isEdit = Boolean(id && id !== 'undefined');

  const form = useForm({ mode: 'onChange' });

  const {
    control,
    formState,
    setError,
    getValues,
    handleSubmit,
    reset,
  } = form;

  const values = useWatch({ control });

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      if (!isEdit) return null;
      const res = await getById(id);
      return res.data.data;
    },
    enabled: isEdit,
    staleTime: 0,
  });

  useEffect(() => {
    if (!data) return;
    if (abortRef.current) return;

    const mapped = mapFromApi(data);

    initialValuesRef.current = mapped;
    setIsActive(data.isActive);
    reset(mapped);
  }, [data, reset, mapFromApi]);

  const isFormChanged = useMemo(() => {
    if (!initialValuesRef.current) return false;

    return compareValues
      ? !compareValues(values, initialValuesRef.current)
      : JSON.stringify(values) !== JSON.stringify(initialValuesRef.current);

  }, [values, compareValues]);

  const submitHandler = useCallback(async (values, { action = submitActions.save } = {}) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      // Data layer (CRUD)
      const payload = mapToApi(values);
      const res = isEdit ? await update(id, payload) : await create(payload);
      const data = res.data.data;

      const entityId = isEdit ? id : data.id;
      notify.success(isEdit ? notifications.successUpdate : notifications.successCreate);
      
      await queryClient.invalidateQueries({ queryKey, exact: false });

      const fresh = mapFromApi(isEdit ? { ...values, id } : data);
      initialValuesRef.current = fresh;
      reset(fresh);

      // Navigation layer (UX)
      onSuccess?.({ id: entityId, action });

    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }, [
    isEdit,
    id,
    create,
    update,
    queryClient,
    queryKey,
    notifications,
    onSuccess,
    mapToApi,
    submitting,
    setSubmitting,
  ]);

  const onError = useCallback((errs) => {
    const firstField = Object.keys(errs)[0];

    const el =
      document.querySelector(`[name='${firstField}']`) ||
      document.querySelector(`#${firstField}`);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  }, []);

  const formSubmitHandler = handleSubmit((values) => {
    submitHandler(values, { action: submitRef.current });
  }, onError);

  const submitSave = () => submitRef.current = submitActions.save;
  const submitSaveAndBack = () => submitRef.current = submitActions.saveAndBack;

  const confirmAction = useCallback(async (config) => {
    const name = getValues('name');
  
    return onConfirm({
      ...config,
      params: { name },
    });
  }, [onConfirm, getValues]);

  const handleActivate = useCallback(async () => {
    const confirmed = await confirmAction({
      titleKey: notifications.confirmActivateTitleKey,
      descriptionKey: notifications.confirmActivateDescKey,
    });

    if (!confirmed) return;

    const prev = isActive;
    setIsActive(true);

    try {
      await activate(id);
      notify.success(notifications.successActivate);
      await queryClient.invalidateQueries({ queryKey, exact: false });
    } catch (err) {
      setIsActive(prev);
    }
  }, [id, activate, notify, notifications, queryClient, queryKey, isActive, confirmAction]);

  const handleDeactivate = useCallback(async () => {
    const confirmed = await confirmAction({
      titleKey: notifications.confirmDeactivateTitleKey,
      descriptionKey: notifications.confirmDeactivateDescKey,
    });

    if (!confirmed) return;

    const prev = isActive;
    setIsActive(false);

    try {
      await deactivate(id);
      notify.success(notifications.successDeactivate);
      await queryClient.invalidateQueries({ queryKey, exact: false });
    } catch (err) {
      setIsActive(prev);
    }
  }, [id, deactivate, notify, notifications, queryClient, queryKey, isActive, confirmAction]);

  useEffect(() => {
    return () => {
      abortRef.current = true;
    };
  }, []);

  return {
    form,
    formSubmitHandler,
    submitSave,
    submitSaveAndBack,
    submitting,
    loading: isLoading,
    isEdit,
    isActive,
    formState,
    isFormChanged,
    handleActivate,
    handleDeactivate,
  };
}