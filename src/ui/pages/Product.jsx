import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { NAV } from '@/config/constants';
import { useI18n } from '@/ui/hooks/useI18n';
import { Buttons } from '@/ui/components/form/FormButtonsBlock';

import { Loading } from '@/ui/components/Loading';
import { useEntityForm } from '@/ui/hooks/useEntityForm'
import { useEntityFormConfig } from '@/ui/hooks/useEntityFormConfig';
import { 
  getProductById,
  createProduct,
  updateProduct,
  activateProduct,
  deactivateProduct
} from '@/domain/product/product.service';
import { getCRUDnotification } from '@/core/utils/notifications';

import { EntityFormLayout } from '@/ui/components/form/EntityFormLayout';
import { EntityFormFieldsRenderer } from '@/ui/components/form/EntityFormFieldsRenderer';

import { pageTags } from '@/config/constants';

export default function Product() {
  const { t, k } = useI18n();

  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  const pageTag = pageTags.product;

  const fieldNames = {
    name: 'name',
    namePublic: 'email',
    sku: 'sku',
    netto: 'netto',
    brutto: 'brutto',

    unitsInOneBox: 'unitsInOneBox',
    unitsInOnePalletRegular: 'unitsInOnePalletRegular',
    unitsInOnePalletMin: 'unitsInOnePalletMin',
    
    boxesInOnePalletRegular: 'boxesInOnePalletRegular',
    boxesInOnePalletMin: 'boxesInOnePalletMin',
    
    unitsOverOnePallet: 'unitsOverOnePallet',
    boxesOverOnePallet: 'boxesOverOnePallet',
  }

  const formConfig = {
    id,
    getById: getProductById,
    create: createProduct,
    update: updateProduct,
    activate: activateProduct,
    deactivate: deactivateProduct,
    notifications: getCRUDnotification(pageTag),
    mapFromApi: (p) => {
      return {
        name: p.name,
        namePublic: p.namePublic,
        sku: p.sku
      }
    },
    mapToApi: (f) => {
      return {
        name: f.name,
        namePublic: f.namePublic,
        sku: f.sku
      }
    },
    onSuccess: () => {},
  }

  const { 
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
    handleDeactivate 
  } = useEntityForm(formConfig);

  const {
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = form;

  function handleBack() {
    const from = location.state?.from || NAV.home;
    if (isDirty) reset();
    else navigate(from, { replace: true });
  };

  const isDisabled = isEdit && !isActive;
  const isNotReadyToSubmit = !isValid || isDisabled || (isEdit && !isDirty);

  const configData = { t, k, fieldNames, isEdit, isActive };
  const { fields, rules } = useEntityFormConfig(configData).product;
  const pageTitle = useMemo(() => isEdit ? t(k[pageTag]?.editCurrent) : t(k[pageTag]?.createNew), [isEdit]);

  const options = {
    isEdit,
  };

  if (loading) return <Loading />;

  return (
    <EntityFormLayout
      title={pageTitle}
      isDisabled={isDisabled}
      onSubmit={handleSubmit(onSubmit, onError)}
      actions={
        <div className='flex gap-2'>
          <Buttons 
            isEdit={isEdit}
            // isChanged={isFormChanged}
            isSubmitDisabled={isNotReadyToSubmit}
            onBack={handleBack}
            onActivate={(isEdit && !isActive) ? handleActivate : null}
            onDeactivate={(isEdit && isActive && !isCurrentUser) ? handleDeactivate : null}
          />
        </div>
      }
    >
      <EntityFormFieldsRenderer
        control={control}
        register={register}
        errors={errors}
        fields={fields}
        rules={rules}
        options={options}
        onAfterChange={null}
      />
    </EntityFormLayout>
  );

}