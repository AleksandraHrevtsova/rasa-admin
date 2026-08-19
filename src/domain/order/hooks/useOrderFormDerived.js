import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { mapOption, findItemById } from '@/core/utils/options.map';
import { orderStatusCodes } from '@/config/constants';

export function useOrderFormDerived({
  t,
  k,
  control, 
  fieldNames, 
  setValue, 
  counterparties,
  orderStatuses,
  data, 
}) {
  const selectedCounterpartyId = useWatch({ control, name: fieldNames.counterparty });
  const selectedHubId = useWatch({ control, name: fieldNames.hub });

  const isDeliveryBlocked = data?.isBlockedAtCreation;

  const filteredHubOptions = useMemo(() => {
    const counterpartyHubs = findItemById(counterparties, selectedCounterpartyId)?.hubs;
    const x = counterpartyHubs?.map(el => mapOption(el));
    console.log('HUBS:', x);
    return x;
  }, [selectedCounterpartyId, counterparties]);

  const selectedCounterparty = useMemo(() => {
    return counterparties?.find(
      cp => cp.id === selectedCounterpartyId
    );
  }, [counterparties, selectedCounterpartyId]);

  const options = {
    counterpartyId: counterparties?.map(el => mapOption(el,)) || [],
    statusId: orderStatuses?.map(el => ({
      value: el.id,
      label: t(k.order[orderStatusCodes[el.code]])
    })) || [],
    hubId: filteredHubOptions || [],
  };

  return {
    options,
    isDeliveryBlocked,
    selectedCounterparty,
    isCounterpartyBlocked: selectedCounterparty?.isOrderBlocked ?? false,
    counterpartyBlockReason: selectedCounterparty?.orderBlockReason ?? null,
  };
};