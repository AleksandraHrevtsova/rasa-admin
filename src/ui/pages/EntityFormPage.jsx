import { useNavigate, useParams } from 'react-router';
import { useAuth } from '@/core/auth/hooks/useAuth';
import { forms } from '@/domain/forms.registry';
import { useI18n } from '@/ui/hooks/useI18n';
import { useEntityForm } from '@/ui/hooks/useEntityForm';
import { BaseEntityForm } from '@/ui/pages/BaseEntityForm.jsx';

export function EntityFormPage({ entity }) {
  const { id } = useParams();
  const { t, k } = useI18n();
  const navigate = useNavigate();
  const { appUser } = useAuth();

  const config = forms[entity];

  const sideData = config.hooks?.useData?.() || {};

  const formConfig = {
    id,
    queryKey: config.key,
    ...config.api,
    mapFromApi: config.mapper.fromApi,
    mapToApi: config.mapper.toApi,
    compareValues: (a, b) =>
      JSON.stringify(config.mapper.normalize(a)) ===
      JSON.stringify(config.mapper.normalize(b)),
    onSuccess: () => {},
  };

  const formState = useEntityForm(formConfig);
  
  const fieldNames = config.fieldNames;

  const derived = config.useDerived?.({
    control: formState.form.control,
    fieldNames,
    setValue: formState.setValue,
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
      options={derived.selectOptions}
    />
  );
}