import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

const findItemById = (arr, id) => arr.find(el => el.id === id);
const mapOption = (item) => ({ value: item.id, label: item.name });

export function useOrganizationFormDerived({ control, fieldNames, setValue, counterparties }) {
  const selectedCounterpartyId = useWatch({ control, name: fieldNames.counterparty });
  const selectedHubIds = useWatch({ control, name: fieldNames.hubs });

  const showClientFields = true; // TODO: add check for role

  const resetParams = {
    shouldDirty: true,
    shouldTouch: true,
    shouldValidate: true,
  }

  useEffect(() => {
    if (!showClientFields) {
      if (selectedCounterpartyId) setValue(fieldNames.counterparty, null, resetParams);
      if (selectedHubIds?.length) setValue(fieldNames.hubs, [], resetParams);
      return;
    }

    if (selectedHubIds?.length) {
      setValue(fieldNames.hubs, [], resetParams);
    }

  }, []);


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
    showClientFields,
  };
}