import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { NAV } from '../constants/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';

import { getRoles } from '../services/role.service';
import { getCounterparties } from '../services/counterparty.service';
import {
  getUserById,
  createUser,
  updateUser,
  activateUser,
  deactivateUser,
} from '../services/user.service';

import { useWatch } from 'react-hook-form';

import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

import { useEntityForm } from '../hooks/useEntityForm';
import { useEntityFormConfig } from '../hooks/useEntityFormConfig';

import { EntityFormLayout } from '../components/EntityFormLayout';
import { EntityFormFieldsRenderer } from '../components/EntityFormFieldsRenderer';

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

  const formConfig = {
    id,
    getById: getUserById,
    create: createUser,
    update: updateUser,
    activate: activateUser,
    deactivate: deactivateUser,
    notifications,
    mapFromApi: (u) => {
      return {
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: { value: u.role?.id, label: u.role?.name },
        counterparty: u?.counterparty?.id
          ? { value: u.counterparty?.id, label: u.counterparty?.nameInternal }
          : null,
        hubs: u.userHubs?.map(({ hub }) => ({ value: hub.id, label: hub.nameInternal })),
      }
    },
    mapToApi: (f) => {
      return {
        name: f.name,
        email: f.email,
        phone: f.phone,
        roleId: f.role.value,
        counterpartyId: f.counterparty?.value || null,
        hubIds: f.hubs?.map((h) => h.value) || [],
        password: f.password,
      }
    },
    onSuccess: handleBack,
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [r, c] = await Promise.all([getRoles(), getCounterparties()]);
        setRoles(r.data.items);
        setCounterparties(c.data.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const selectedRole = useWatch({ control, name: 'role' });
  const selectedCounterparty = useWatch({ control, name: 'counterparty' });

  const showClientFields = selectedRole?.label?.includes('client-');

  const isDisabled = isEdit && !isActive;
  const pageTitle = useMemo(() => isEdit ? t['user.editCurrent'] : t['user.createNew'], [isEdit]);

  const isNotReadyToSubmit = !isValid || isDisabled || (isEdit && !isDirty);

  const initialized = useRef(false);

  const handleCounterpartyChange = () => {
    setValue('hubs', [], { 
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
      setValue('counterparty', null, { shouldValidate: true });
      setValue('hubs', [], { shouldValidate: true });
      return;
    }

    if (!selectedCounterparty?.value) {
      setValue('hubs', [], { shouldValidate: true });
    }
  
  }, [selectedCounterparty?.value, showClientFields]);

  const { fields, rules } = useEntityFormConfig({ t, isEdit, showClientFields }).user;

  const mapOption = (item, labelKey = 'name') => ({ value: item.id, label: item[labelKey] }); 
  const filteredHubOptions = useMemo(() => {
    const counterpartyHubs = counterparties?.find(cp => cp?.id === selectedCounterparty?.value)?.hubs;
    return counterpartyHubs ? counterpartyHubs.map(el => mapOption(el, 'nameInternal')) : [];
  }, [counterparties, selectedCounterparty]);

  const options = {
    roles: roles.map(el => mapOption(el)),
    counterparties: counterparties.map(el => mapOption(el, 'nameInternal')),
    hubs: filteredHubOptions,
    showClientFields,
    isEdit,
  };

  function handleBack() {
    const from = location.state?.from || NAV.home;
    if (isDirty) reset();
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
            label={isDirty ? t['cancel'] : t['back']}
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