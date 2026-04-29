import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { NAV } from '@/config/constants';

import { EntityFormLayout } from '@/ui/components/form/EntityFormLayout';
import { EntityFormFieldsRenderer } from '@/ui/components/form/EntityFormFieldsRenderer';
import { Buttons } from '@/ui/components/form/FormButtonsBlock';
import { Loading } from '@/ui/components/Loading';

export function BaseEntityForm({
  // from useEntityForm
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
    return !isValid || isDisabled || (isEdit && !isFormChanged);
  }, [isValid, isDisabled, isEdit, isFormChanged]);

  const handleBack = () => {
    const from = location.state?.from || NAV.home;

    if (isFormChanged) {
      reset();
    } else {
      navigate(from, { replace: true });
    }
  };

  if (loading) return <Loading />;

  return (
    <EntityFormLayout
      title={title}
      isDisabled={isDisabled}
      onSubmit={handleSubmit(onSubmit, onError)}
      actions={
        <Buttons
          isEdit={isEdit}
          isChanged={isFormChanged}
          isSubmitDisabled={isSubmitDisabled}
          onBack={handleBack}
          onActivate={permissions.canActivate ? handleActivate : null}
          onDeactivate={permissions.canDeactivate ? handleDeactivate : null}
        />
      }
    >
      <EntityFormFieldsRenderer
        control={control}
        register={register}
        errors={errors}
        fields={fields}
        rules={rules}
        options={options}
        setValue={setValue}
      />
    </EntityFormLayout>
  );
}