import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NAV } from '@/config/constants';
import { EntityFormLayout } from '@/ui/components/form/EntityFormLayout';
import { EntityFormRenderer } from '@/ui/components/form/EntityFormRenderer';

import { Buttons } from '@/ui/components/form/FormButtonsBlock';
import { Loading } from '@/ui/components/Loading';

export function BaseEntityForm({
  // from useEntityForm
  form,
  formSubmitHandler,
  submitSave,
  submitSaveAndBack,
  submitting,
  loading,
  isEdit,
  isActive,
  formState: { isDirty, isValid },
  isFormChanged,
  handleActivate,
  handleDeactivate,

  // config
  title,
  permissions,
  fields,
  rules,
  options = {},

  // optional
  isDisabled: externalDisabled,
}) {
  const location = useLocation();
  const navigate = useNavigate();
   
  const {
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = form;

  const isDisabled = useMemo(() => {
    if (externalDisabled !== undefined) return externalDisabled;
    return isEdit && !isActive;
  }, [externalDisabled, isEdit, isActive]);

  const isSubmitDisabled = useMemo(() => {
    const hasEffectiveChanges = isFormChanged;
    return (
      submitting ||
      !isValid ||
      isDisabled ||
      (isEdit && !hasEffectiveChanges)
    );
  }, [submitting, isValid, isDisabled, isEdit, isFormChanged]);

  const handleBack = () => {
    if (isFormChanged) {
      reset();
      return;
    } 
    const from = location.state?.from || NAV.home;
    navigate(from, { replace: true });
  };

  if (loading || submitting) return <Loading />;

  return (
    <EntityFormLayout
      title={title}
      isDisabled={isDisabled}
      onSubmit={formSubmitHandler}
      actions={
        <Buttons
          isEdit={isEdit}
          isChanged={isFormChanged}
          isSubmitDisabled={isSubmitDisabled}
          onBack={handleBack}
          onSubmit={submitSave}
          onSubmitAndBack={submitSaveAndBack}
          onActivate={permissions.canActivate ? handleActivate : null}
          onDeactivate={permissions.canDeactivate ? handleDeactivate : null}
        />
      }
    >
      <EntityFormRenderer
        nodes={fields}
        control={control}
        register={register}
        errors={errors}
        rules={rules}
        options={options}
        setValue={setValue}
      />
    </EntityFormLayout>
  );
}