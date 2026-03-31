import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { NAV } from '../constants/navigation';

import { useLocale } from '../contexts/LocaleContext';

import { getRoles } from '../services/role.service';
import { getCounterparties } from '../services/counterparty.service';
import { getUserById, createUser } from '../services/user.service';

import { useForm, useWatch } from 'react-hook-form';
import { Loading } from '../components/Loading';
import { WrappedSelect, WrappedInput, FormButton } from '../components/FormComponents';

export default function User() {
  const { t } = useLocale();

  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [roles, setRoles] = useState([]);
  const [counterparties, setCounterparties] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  const selectedRole = useWatch({ control, name: 'role' });
  const selectedCounterparty = useWatch({ control, name: 'counterparty' });

  const showClientFields = selectedRole?.label?.includes('client-');

  const fetchData = async () => {
    setLoading(true);
    try {
      const r = await getRoles();
      const cp = await getCounterparties();
      setRoles(r);
      setCounterparties(cp);
    } catch (err) {
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    const data = await getUserById(id);

    reset({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: { value: data.role.id, label: data.role.name },
      counterparty: data.counterpartyId ? { value: data.counterpartyId, label: data.counterpartyName } : null,
      hubs: data.userHubs?.map(h => ({ value: h.hubId, label: h.name }))
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    fetchUser();
  }, [id, isEdit, reset]);

  useEffect(() => {
    setValue('hubs', []);
  }, [selectedCounterparty?.value]);

  useEffect(() => {
    if (!showClientFields) {
      setValue('counterparty', null);
      setValue('hubs', []);
    }
  }, [selectedRole?.value]);

  const fieldsData = {
    role: {
      name: 'role',
      type: 'select',
      isMulti: false,
      placeholder: t['user.role'],
    },
    counterparty: {
      name: 'counterparty',
      type: 'select',
      isMulti: false,
      placeholder: t['user.counterparty'],
    },
    hubs: {
      name: 'hubs',
      type: 'select',
      isMulti: true,
      placeholder: t['user.hubs'],
    },
    name: {
      name: 'name',
      type: 'text',
      placeholder: t['user.name'],
      required: !isEdit && true, 
    },
    phone: {
      name: 'phone',
      type: 'tel',
      required: !isEdit && true,
      placeholder: t['user.phone'],
    },
    email: {
      name: 'email',
      type: 'email',
      placeholder: t['user.email'],
      required: !isEdit && true, 
    },
    password: {
      name: 'password',
      type: 'password',
      required: !isEdit && true,
      placeholder: t['user.password'],
    }
  };

  const rules = {
    counterparty: {
      validate: (value) => {
        if (showClientFields && !value) {
          return t['rules.counterparty']
        }
        return true;
      }
    },
    hubs: {
      validate: (value) => {
        if (showClientFields && (!value || value.length === 0)) {
          return t['rules.hubs']
        }
        return true;
      }
    },
    name: { required: t['rules.name'] },
    phone: {
      required: t['rules.phone'],
      pattern: {
        value: /^[\d+()\-\s]{7,20}$/,
        message: t['rules.incorrectPhone']
      }
    },
    email: {
      required: t['rules.email'],
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: t['rules.incorrectEmail']
      }
    },
    password: { 
      required: !isEdit ? t['rules.password'] : false, 
      minLength: { 
        value: 6, 
        message: t['rules.passwordMinLength']
      } 
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

  const handleBack = () => {
    const from = location.state?.from + '' || NAV.home;
    navigate(from, { replace: true })
  };

  const onSubmit = async (formData) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,

      counterpartyId: formData.counterparty?.value || null,
      hubIds: formData.hubs?.map((h) => h.value) || [],
    }
    if (!isEdit) {
      payload.password = formData.password
    }

    console.log('onSubmit payload:', payload);
    // if (isEdit) {
    //   await updateUser(id, payload);
    // } else {
    //   await createUser(payload);
    // }
    handleBack();
  };

  const onError = (errs) => {
    const firstErrorField = Object.keys(errs)[0];
    const el = document.querySelector(`[name='${firstErrorField}']`) || document.querySelector(`#${firstErrorField}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  };

  if (loading) return <Loading />

  return (
    <div className='p-4 max-w-xl'>
      <h1 className='text-xl font-semibold mb-4'>{pageTitle}</h1>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className='flex flex-col gap-4'
      >
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
          <FormButton type='submit' label={t['save']} handleClick={null} isAccent={true} />
          <FormButton type='button' label={t['cancel']} handleClick={handleBack} />
        </div>
      </form>
    </div>
  )
}