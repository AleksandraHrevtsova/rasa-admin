import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { NAV } from '../../config/constants';
import { useLocale } from '../../contexts/LocaleContext';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { useEntityForm } from '../hooks/useEntityForm'
import { useEntityFormConfig } from '../hooks/useEntityFormConfig';
import { 
  getProductById,
  createProduct,
  updateProduct,
  activateProduct,
  deactivateProduct
} from '../../domain/product/product.service';

import { EntityFormLayout } from '../components/form/EntityFormLayout';
import { EntityFormFieldsRenderer } from '../components/form/EntityFormFieldsRenderer';

export default function Product() {
  const { t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const notifications = {
    confirmDeactivate: t['user.confirmDeactivate'] || 'Confirm?',
    successUpdate: t['user.updated'] || 'Updated!',
    successCreate: t['user.created'] || 'Created!',
    successActivate: t['user.activated'] || 'Activated!',
    successDeactivate: t['user.deactivated'] || 'Deactivated!',
  };

  const formConfig = {
    id,
    getById: getProductById,
    create: createProduct,
    update: updateProduct,
    activate: activateProduct,
    deactivate: deactivateProduct,
    notifications,
    mapFromApi: (p) => {
      return {
        nameInternal: p.nameInternal,
        namePublic: p.namePublic,
        sku: p.sku
      }
    },
    mapToApi: (f) => {
      console.log(f);
      return {
        nameInternal: f.nameInternal,
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

  const { fields, rules } = useEntityFormConfig({ t, isEdit }).product;
  const pageTitle = useMemo(() => isEdit ? t['product.editCurrent'] : t['product.createNew'], [isEdit]);

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
          <Button
            type='submit'
            label={isEdit ? t['save'] : t['create']}
            action='submit'
            disabled={isNotReadyToSubmit}
          />

          <Button
            label={isDirty ? t['cancel'] : t['back']}
            onClick={handleBack}
          />

          {isEdit && isActive && (
            <Button
              label={t['deactivate']}
              action='deactivate'
              onClick={handleDeactivate}
            />
          )}

          {isEdit && !isActive && (
            <Button
              label={t['activate']}
              action='activate'
              onClick={handleActivate}
              disabled={isActive}
            />
          )}
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