import { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useWatch } from 'react-hook-form';

import { NAV } from '@/config/constants';
import { useAuth } from '@/contexts/AuthContext';

import { getRolesCached } from '@/core/cache/roles.cache';
import { getCounterpartiesCached } from '@/core/cache/counterparties.cache';

import { getCRUDnotification } from '@/core/utils/notifications';

import {
  getUserById,
  createUser,
  updateUser,
  activateUser,
  deactivateUser,
} from '@/domain/user/user.service';
import { mapFromApi, mapToApi } from '@/domain/user/user.mapper';
import { normalizeUser } from '@/domain/user/user.compare';

import { useI18n } from '@/ui/hooks/useI18n';
import { useEntityForm } from '@/ui/hooks/useEntityForm';
import { useEntityFormConfig } from '@/ui/hooks/useEntityFormConfig';

import { Loading } from '@/ui/components/Loading';
import { Buttons } from '@/ui/components/form/FormButtonsBlock';
import { EntityFormLayout } from '@/ui/components/form/EntityFormLayout';
import { EntityFormFieldsRenderer } from '@/ui/components/form/EntityFormFieldsRenderer';

import { pageTags } from '@/config/constants';

const findItemById = (arr, id) => arr.find(el => el.id === id);
const mapOption = (item) => ({ value: item.id, label: item.name }); 

export default function User() {
  const { t, k } = useI18n();

  const location = useLocation();
  const navigate = useNavigate();

  const { appUser } = useAuth();
  const { id } = useParams();

  const [roles, setRoles] = useState([]);
  const [counterparties, setCounterparties] = useState([]);

  const isCurrentUser = id === appUser.id;

  const pageTag = pageTags.user;

  const fieldNames = {
    name: 'name',
    email: 'email',
    phone: 'phone',
    role: 'roleId',
    counterparty: 'counterpartyId',
    hubs: 'hubIds',
    password: 'password'
  }

  const compareUsers = (a, b) => {  
    return JSON.stringify(normalizeUser(a)) === JSON.stringify(normalizeUser(b));
  };

  const formConfig = {
    id,
    queryKey: pageTag,
    getById: getUserById,
    create: createUser,
    update: updateUser,
    activate: activateUser,
    deactivate: deactivateUser,
    notifications: getCRUDnotification(pageTag),
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

  const selectedRole = useMemo(() => findItemById(roles, selectedRoleId), [roles, selectedRoleId]);

  const showClientFields = selectedRole?.name?.includes('client-');

  const isDisabled = isEdit && !isActive;
  const pageTitle = useMemo(() => isEdit ? t(k[pageTag]?.editCurrent) : t(k[pageTag]?.createNew), [isEdit]);

  const isEmptySelect = (v) => v == null;
  const isNotReadyToSubmit = !isValid || isDisabled || (isEdit && !isFormChanged) || !selectedRoleId;

  const initialized = useRef(false);

  const handleCounterpartyChange = () => {
    setValue(fieldNames.hubs, [], { 
      shouldDirty: true,
      shouldTouch: true,
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

  const configData = { t, k, fieldNames, isEdit, showClientFields, isActive };
  const { fields, rules } = useEntityFormConfig(configData).user;

  const filteredHubOptions = useMemo(() => {
    const counterpartyHubs = findItemById(counterparties, selectedCounterpartyId)?.hubs;
    return counterpartyHubs?.map(mapOption);
  }, [counterparties, selectedCounterpartyId]);

  const options = {
    roleId: roles?.map(mapOption) || [],
    counterpartyId: counterparties?.map(mapOption) || [],
    hubIds: filteredHubOptions || [],
  };

  function handleBack() {
    const from = location.state?.from || NAV.home;
    if (isFormChanged) {
      reset(formConfig.initialValuesRef?.current);
    } else {
      navigate(from, { replace: true });
    }
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
            isChanged={isFormChanged}
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
        onAfterChange={handleCounterpartyChange}
      />
    </EntityFormLayout>
  );
};

