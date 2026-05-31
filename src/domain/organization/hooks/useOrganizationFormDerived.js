import { useEffect, useMemo, useRef } from 'react';
import { useWatch } from 'react-hook-form';

import { mapOption, findItemById } from '@/core/utils/options.map';

export function useOrganizationFormDerived({
  t,
  k,
  control,
  fieldNames,
  setValue,
  getValues,
  counterparties,
  data,
}) {
  const type = useWatch({ control, name: fieldNames.type });

  const resetParams = useMemo(() => ({
    shouldDirty: true,
    shouldTouch: true,
    shouldValidate: true,
  }), []);

  const isLogistics = type === 'LOGISTICS';
  const isPayment = type === 'PAYMENT';

  const initialRef = useRef(null);

  useEffect(() => {
    if (initialRef.current || !data) return;

    initialRef.current = {
      counterpartyId: data?.counterparty?.id || data?.counterpartyId || null,
    };
  }, [data]);
  
  useEffect(() => {
    if (!isPayment) return;

    const currentCounterparty = getValues(fieldNames.counterparty);

    if (currentCounterparty) {
      setValue( fieldNames.counterparty, null, resetParams);
    }
  }, [
    isPayment,
    getValues,
    setValue,
    fieldNames.counterparty,
    resetParams,
  ]);

  useEffect(() => {
    if (!isLogistics) return;
    if (!initialRef.current) return;

    const initialCounterpartyId = initialRef.current.counterpartyId;
    const currentCounterparty = getValues(fieldNames.counterparty);

    if (initialCounterpartyId && currentCounterparty !== initialCounterpartyId) {
      setValue(fieldNames.counterparty, initialCounterpartyId, resetParams);
    }
  }, [
    isLogistics,
    getValues,
    setValue,
    fieldNames.counterparty,
    resetParams,
  ]);
  
  const options = useMemo(() => ({
    counterpartyId: counterparties?.map(el => mapOption(el)) || [],
    type: [
      { value: 'LOGISTICS', label: t(k.organization.typeLogistics) },
      { value: 'PAYMENT', label: t(k.organization.typePayment) },
    ],
  }), [counterparties, t, k]);

  return {
    options,
    isLogistics,
    isPayment,
    bankAccounts: data?.bankAccounts || [],
    organizationId: data?.id,
    organizationName: data?.name,
  };
}