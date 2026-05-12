import { useNavigate, useParams } from 'react-router';
import { submitActions } from '@/config/constants';
import { useAuth } from '@/core/auth/hooks/useAuth';
import { navigateToEntity } from '@/core/utils/navigation';
import { forms } from '@/domain/forms.registry';
import { useI18n } from '@/ui/hooks/useI18n';
import { useEntityForm } from '@/ui/hooks/useEntityForm';
import { useCRUDnotification } from '@/ui/hooks/useCRUDnotification';
import { BaseEntityForm } from '@/ui/pages/BaseEntityForm.jsx';

export function EntityFormPage({ entity }) {
  const { id } = useParams();
  const { t, k } = useI18n();
  const { appUser } = useAuth();
  const navigate = useNavigate();
  const config = forms[entity];

  const sideData = config.hooks?.useData?.() || {};
  const notifications = useCRUDnotification(entity);
  
  const handleSuccess = ({ id, action }) => {
    const targetId = id;
    const paths = config.paths;
  
    if (action === submitActions.saveAndBack) {
      navigate(paths.list, { replace: true });
      return;
    }
  
    navigateToEntity({
      navigate,
      location,
      listPath: paths.list,
      createPath: paths.create,
      editPath: paths.edit,
      id: targetId,
    });
  };

  const formConfig = {
    id,
    queryKey: config.key,
    ...config.api,
    notifications,
    mapFromApi: config.mapper.fromApi,
    mapToApi: config.mapper.toApi,
    onSuccess: handleSuccess,
    compareValues: (a, b) =>
      JSON.stringify(config.mapper.normalize(a)) ===
      JSON.stringify(config.mapper.normalize(b)),
  };

  const formState = useEntityForm(formConfig);
  
  const fieldNames = config.fieldNames;

  const derived = config.useDerived?.({
    control: formState.form.control,
    fieldNames,
    setValue: formState.form.setValue,
    ...sideData,
  }) || {};

  const isCurrentUser = id === appUser?.id;

  const ctx = {
    t,
    k,
    fieldNames: config.fieldNames,
    isEdit: formState.isEdit,
    isActive: formState.isActive,
    isCurrentUser,
    ...sideData,
    ...derived,
  };

  const { pagetitle, permissions, fields, rules } = config.config(ctx);

  return (
    <BaseEntityForm
      {...formState}
      title={pagetitle}
      permissions={permissions}
      fields={fields}
      rules={rules}
      options={derived.options}
    />
  );
}