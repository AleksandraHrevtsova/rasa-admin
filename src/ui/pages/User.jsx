import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { NAV } from '../../config/constants';
import { useAuth } from '../../contexts/AuthContext';
import { useLocale } from '../../contexts/LocaleContext';

import { getRolesCached, getCounterpartiesCached } from '../../core/cache/dictionaries.cache';

import {
  getUserById,
  createUser,
  updateUser,
  activateUser,
  deactivateUser,
} from '../../domain/user/user.service';

import { useWatch } from 'react-hook-form';

import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

import { useEntityForm } from '../hooks/useEntityForm';
import { useEntityFormConfig } from '../hooks/useEntityFormConfig';

import { EntityFormLayout } from '../components/form/EntityFormLayout';
import { EntityFormFieldsRenderer } from '../components/form/EntityFormFieldsRenderer';
import { mapFromApi, mapToApi } from '../../domain/user/user.mapper';

export default function User() {
  const { t } = useLocale();
  const { appUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [roles, setRoles] = useState([]);
  const [counterparties, setCounterparties] = useState([]);

  const isCurrentUser = id === appUser.id;

  const notifications = {
    confirmDeactivate: t['user.confirmDeactivate'] || 'Confirm?',
    successUpdate: t['user.updated'] || 'Updated!',
    successCreate: t['user.created'] || 'Created!',
    successActivate: t['user.activated'] || 'Activated!',
    successDeactivate: t['user.deactivated'] || 'Deactivated!',
  };

  const fieldNames = {
    name: 'name',
    email: 'email',
    phone: 'phone',
    role: 'roleId',
    counterparty: 'counterpartyId',
    hubs: 'hubIds'
  }

  const compareUsers = (a, b) => {
    const normalize = (u) => ({
      name: u.name || '',
      email: u.email || '',
      phone: u.phone || '',
      roleId: u.role?.value ?? u.roleId,
      counterpartyId: u.counterpartyId || null,
      hubIds: (u.hubIds || []).slice().sort(),
    });
  
    return JSON.stringify(normalize(a)) === JSON.stringify(normalize(b));
  };

  const formConfig = {
    id,
    getById: getUserById,
    create: createUser,
    update: updateUser,
    activate: activateUser,
    deactivate: deactivateUser,
    notifications,
    mapFromApi: mapFromApi,
    mapToApi: mapToApi,
    onSuccess: handleBack,
    compareValues: compareUsers,
  };

  const { 
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
    handleDeactivate 
  } = useEntityForm(formConfig);

  const {
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roles, counterparties] = await Promise.all([getRolesCached(), getCounterpartiesCached()]);
        setRoles(roles);
        setCounterparties(counterparties);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const selectedRoleId = useWatch({ control, name: fieldNames.role });
  const selectedCounterpartyId = useWatch({ control, name: fieldNames.counterparty });

  const showClientFields = roles.find(r => r.id === selectedRoleId)?.name?.includes('client-');

  const isDisabled = isEdit && !isActive;
  const pageTitle = useMemo(() => isEdit ? t['user.editCurrent'] : t['user.createNew'], [isEdit]);

  const isNotReadyToSubmit = !isValid || isDisabled || (isEdit && !isFormChanged);

  const initialized = useRef(false);

  const handleCounterpartyChange = () => {
    setValue(fieldNames.hubs, [], { 
      shouldDirty: true,
      shouldValidate: true 
    });
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }

    if (!showClientFields) {
      setValue(fieldNames.counterparty, null, { shouldValidate: true });
      setValue(fieldNames.hubs, [], { shouldValidate: true });
      return;
    }

    if (!selectedCounterpartyId) {
      setValue(fieldNames.hubs, [], { shouldValidate: true });
    }
  
  }, [selectedCounterpartyId, showClientFields]);

  const { fields, rules } = useEntityFormConfig({ t, isEdit, showClientFields, isActive }).user;

  const mapOption = (item, labelKey = 'name') => ({ value: item.id, label: item[labelKey] }); 

  const filteredHubOptions = useMemo(() => {
    const counterpartyHubs = counterparties?.find(cp => cp?.id === selectedCounterpartyId)?.hubs;
    return counterpartyHubs?.map(el => mapOption(el, 'nameInternal'));
  }, [counterparties, selectedCounterpartyId]);

  const options = {
    roleId: roles.map((el) => mapOption(el)) || [],
    counterpartyId: counterparties.map((el) => mapOption(el, 'nameInternal')) || [],
    hubIds: filteredHubOptions || [],
  };

  function handleBack() {
    const from = location.state?.from || NAV.home;
    if (isFormChanged) reset();
    else navigate(from, { replace: true });
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
            label={isFormChanged ? t['cancel'] : t['back']}
            action='show'
            onClick={handleBack}
          />

          {isEdit && isActive && !isCurrentUser && (
            <Button
              label={t['deactivate']}
              action='deactivate'
              onClick={handleDeactivate}
              disabled={isCurrentUser}
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
        onAfterChange={handleCounterpartyChange}
      />
    </EntityFormLayout>
  );
}