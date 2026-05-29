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
  const selectedCounterpartyId = useWatch({ control, name: fieldNames.counterparty });

  const resetParams = useMemo(() => ({
    shouldDirty: true,
    shouldTouch: true,
    shouldValidate: true,
  }), []);

  const isLogistics = type === 'LOGISTICS';
  const isPayment = type === 'PAYMENT';

  const initialRef = useRef(null);

  useEffect(() => {
    if (!initialRef.current && data) {
      initialRef.current = {
        counterpartyId: data?.counterpartyId || null,
        hubIds: data?.hubIds || [],
      };
    }
  }, [data]);
  
  useEffect(() => {
    if (!isPayment) return;

    setValue(fieldNames.counterparty, null, resetParams);
    setValue(fieldNames.hubs, [], resetParams);
  }, [isPayment, setValue, fieldNames, resetParams]);

  useEffect(() => {
    if (!isLogistics) return;
    if (!initialRef.current) return;

    const { counterpartyId, hubIds } = initialRef.current;

    const currentCounterparty = getValues(fieldNames.counterparty);

    if (counterpartyId && currentCounterparty !== counterpartyId) {
      setValue(fieldNames.counterparty, counterpartyId, resetParams);
    }

    const currentHubs = getValues(fieldNames.hubs);

    if (hubIds?.length && JSON.stringify(currentHubs) !== JSON.stringify(hubIds)) {
      setValue(fieldNames.hubs, hubIds, resetParams);
    }
  }, [
    isLogistics,
    getValues,
    setValue,
    fieldNames,
    resetParams,
  ]);
  
  useEffect(() => {
    if (!isLogistics) return;
    if (!selectedCounterpartyId) return;

    setValue(fieldNames.hubs, [], resetParams);
  }, [isLogistics, selectedCounterpartyId, setValue, fieldNames, resetParams]);


  const filteredHubOptions = useMemo(() => {
    const counterpartyHubs = findItemById(counterparties, selectedCounterpartyId)?.hubs;
    return counterpartyHubs?.map(el => mapOption(el));
  }, [selectedCounterpartyId, counterparties]);

  const options = useMemo(() => ({
    counterpartyId: counterparties?.map(el => mapOption(el)) || [],
    hubIds: filteredHubOptions || [],
    type: [
      { value: 'LOGISTICS', label: t(k.organization.typeLogistics) },
      { value: 'PAYMENT', label: t(k.organization.typePayment) },
    ],
  }), [counterparties, filteredHubOptions, t, k]);

  return {
    options,
    isLogistics,
    isPayment,
  };
}