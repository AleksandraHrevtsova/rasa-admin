import { useState, useEffect, useMemo } from 'react';
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
  deactivateUser 
} from '../services/user.service';

import { useForm, useWatch } from 'react-hook-form';
import { useNotify } from '../hooks/useNotify';
import { Loading } from '../components/Loading';
import { WrappedSelect, WrappedInput } from '../components/FormComponents';
import { Button } from '../components/Button';
export default function User() {
  const { t } = useLocale();
  const notify = useNotify();
  const { appUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const isCurrentUser = id === appUser.id;
  
  const [roles, setRoles] = useState([]);
  const [counterparties, setCounterparties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(true);

  const isDisabled = isEdit && !isActiveUser;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    formState: { errors, isDirty, isValid }
  } = useForm({ mode: 'onChange' });

  const selectedRole = useWatch({ control, name: 'role' });
  const selectedCounterparty = useWatch({ control, name: 'counterparty' });
  const showClientFields = selectedRole?.label?.includes('client-');

  const fetchData = async () => {
    const [roles, counterParties] = await Promise.all([getRoles(), getCounterparties()]);
    setRoles(roles);
    setCounterparties(counterParties);
  };

  const fetchUser = async () => {
    const { data } = await getUserById(id);
    setIsActiveUser(data.isActive);
    reset({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: { value: data.role?.id, label: data.role?.name },
      counterparty: data.counterpartyId ? { value: data.counterpartyId, label: data.counterpartyName } : null,
      hubs: data.userHubs?.map(h => ({ value: h.hubId, label: h.name }))
    });
  };

  const showErrorNotify = (err) => {
    const resData = err.response?.data;
    notify.error(resData.message);
  };

  useEffect(() => {
    const fetchAll = async() => {
      setLoading(true);
      try {
        await fetchData();

        if (isEdit) {
          await fetchUser();
        }
      } catch (err) {
        showErrorNotify(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [id]);

  useEffect(() => {
    if (!showClientFields) {
      setValue('counterparty', null);
      setValue('hubs', []);
    }
    if (!selectedCounterparty?.value) {
      setValue('hubs', []);
    }
  }, [selectedRole?.value, selectedCounterparty?.value]);

  const fieldsData = {
    role: { name: 'role', type: 'select', placeholder: t['user.role'], isMulti: false },
    counterparty: { name: 'counterparty', type: 'select', placeholder: t['user.counterparty'], isMulti: false },
    hubs: { name: 'hubs', type: 'select', placeholder: t['user.hubs'], isMulti: true },
    name: { name: 'name', type: 'text', placeholder: t['user.name'] },
    phone: { name: 'phone', type: 'tel', placeholder: t['user.phone'] },
    email: { name: 'email', type: 'email', placeholder: t['user.email'] },
    password: { name: 'password', type: 'password', placeholder: t['user.password'] }
  };

  const rules = {
    counterparty: { validate: (v) => (showClientFields && !v) && t['rules.counterparty'] },
    hubs: { validate: (v) => (showClientFields && (!v || v.length === 0)) && t['rules.hubs'] },
    name: { required: t['rules.name'] },
    phone: {
      required: t['rules.phone'],
      pattern: { value: /^[\d+()\-\s]{7,20}$/, message: t['rules.incorrectPhone'] }
    },
    email: {
      required: t['rules.email'],
      pattern: { value: /^\S+@\S+\.\S+$/, message: t['rules.incorrectEmail'] }
    },
    password: { 
      required: !isEdit ? t['rules.password'] : false, 
      minLength: { value: 6, message: t['rules.passwordMinLength'] } 
    },
  };

  const pageTitle = useMemo(() => isEdit ? t['user.editCurrent'] : t['user.createNew'], [isEdit]);

  const mapOption = (item, labelKey = 'name') => ({ value: item.id, label: item[labelKey] }); 
  const rolesOptions = useMemo(() => roles?.map(el => mapOption(el)), [roles]);
  const counterpartiesOptions = useMemo(() => counterparties?.map(el => mapOption(el, 'nameInternal')), [counterparties]);
  const filteredHubOptions = useMemo(() => {
    const counterpartyHubs = counterparties?.find(cp => cp?.id === selectedCounterparty?.value)?.hubs;
    return counterpartyHubs ? counterpartyHubs.map(el => mapOption(el, 'nameInternal')) : [];
  }, [counterparties, selectedCounterparty]);

  const isNotReadyToSubmit = !isValid || isDisabled || (isEdit && !isDirty);

  const handleBack = () => {
    const from = location.state?.from || NAV.home;
    if (isDirty) reset();
    else navigate(from, { replace: true });
  };

  const onSubmit = async (formData) => {
    if (isDisabled) return;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      roleId: formData.role.value,
      counterpartyId: formData.counterparty?.value || null,
      hubIds: formData.hubs?.map((h) => h.value) || [],
    }
    
    try {
      if (isEdit) {
        await updateUser(id, payload);
        notify.success(t['user.updated'] );
      } else {
        payload.password = formData.password
        await createUser(payload);
        notify.success(t['user.created'] );
      }
      handleBack();
    } catch (err) {
      showErrorNotify(err);

      if (err.message.includes('Email')) {
        setError('email', { type: 'server', message: resData.message })
      }

      if (err.message.includes('Phone')) {
        setError('phone', { type: 'server', message: resData.message })
      }
    }
  };

  const onError = (errs) => {
    const firstErrorField = Object.keys(errs)[0];
    const el = document.querySelector(`[name='${firstErrorField}']`) || document.querySelector(`#${firstErrorField}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  };

  const handleDeactivate = async () => {
    if (isCurrentUser) {
      alert(t['user.cannotDeactivateSelf']);
      return;
    }

    const confirmed = window.confirm(t['user.confirmDeactivate']);
    if (!confirmed) return;

    await deactivateUser(id);
    setIsActiveUser(false);
  };
  
  const handleActivate = async () => {
    await activateUser(id);
    setIsActiveUser(true);
  };

  if (loading) return <Loading />

  return (
    <div className='p-4 max-w-xl'>
      <h1 className='text-xl font-semibold mb-4'>{pageTitle}</h1>

      {!isActiveUser && (
        <div className='bg-red-100 text-red-700 p-2 rounded mb-4'>
          {t['user.deactivated']}
        </div>
      )}
      <div className={isDisabled ? 'opacity-50' : ''}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col gap-4'>
          <WrappedSelect control={control} data={fieldsData.role} options={rolesOptions} errors={errors}/>
          {showClientFields && (
            <>
              <WrappedSelect 
                control={control} 
                data={fieldsData.counterparty} 
                options={counterpartiesOptions} 
                isDisabled={!showClientFields}
                rules={rules.counterparty}
                errors={errors}
              />
              <WrappedSelect 
                control={control} 
                data={fieldsData.hubs} 
                options={filteredHubOptions} 
                isDisabled={!selectedCounterparty}
                rules={rules.hubs}
                errors={errors}
              />
            </>
          )}
          <WrappedInput register={register} data={fieldsData.name} errors={errors} rules={rules.name} />
          <WrappedInput register={register} data={fieldsData.phone} errors={errors} rules={rules.phone} />
          <WrappedInput register={register} data={fieldsData.email} errors={errors} rules={rules.email} />
          {!isEdit && <WrappedInput register={register} data={fieldsData.password} errors={errors} rules={rules.password} /> }

          <div className='flex gap-2'>
            <Button 
              type='submit' 
              label={t['save']} 
              handleClick={null} 
              action='submit' 
              isDisabled={isNotReadyToSubmit}
            />
            <Button label={isDirty ? t['cancel'] : t['back']} handleClick={handleBack} />
            {isEdit && isActiveUser && !isCurrentUser && (
              <Button label={t['deactivate']} handleClick={handleDeactivate} action='deactivate' isDisabled={isCurrentUser} />
            )}
          </div>
        </form>
      </div>
        {!isActiveUser && (
          <Button label={t['activate']} handleClick={handleActivate} action='activate' isDisabled={isActiveUser} />
        )}
    </div>
  )
}