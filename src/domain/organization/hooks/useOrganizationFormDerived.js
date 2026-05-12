import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { mapOption, findItemById } from '@/core/utils/options.map';

export function useOrganizationFormDerived({ control, fieldNames, setValue, counterparties }) {
  const selectedCounterpartyId = useWatch({ control, name: fieldNames.counterparty });
  const selectedHubIds = useWatch({ control, name: fieldNames.hubs });
  const checkedIsRelated = useWatch({ control, name: fieldNames.isRelated })

  const isRelatedToCounterparty = checkedIsRelated;

  const resetParams = {
    shouldDirty: true,
    shouldTouch: true,
    shouldValidate: true,
  }

  useEffect(() => {
    if (!isRelatedToCounterparty) {
      if (selectedCounterpartyId) setValue(fieldNames.counterparty, null, resetParams);
      if (selectedHubIds?.length) setValue(fieldNames.hubs, [], resetParams);
      return;
    }

    if (selectedHubIds?.length) {
      setValue(fieldNames.hubs, [], resetParams);
    }

  }, [isRelatedToCounterparty]);


  useEffect(() => {
    if (!selectedCounterpartyId) return;
  
    setValue(fieldNames.hubs, [], resetParams);
  }, [selectedCounterpartyId]);

  const filteredHubOptions = useMemo(() => {
    const counterpartyHubs = findItemById(counterparties, selectedCounterpartyId)?.hubs;
    return counterpartyHubs?.map(mapOption);
  }, [selectedCounterpartyId, counterparties]);

  const selectOptions = {
    counterpartyId: counterparties?.map(mapOption) || [],
    hubIds: filteredHubOptions || [],
  };

  return {
    selectOptions,
    isRelatedToCounterparty,
  };
}