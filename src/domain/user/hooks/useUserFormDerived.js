import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

const findItemById = (arr, id) => arr.find(el => el.id === id);
const mapOption = (item) => ({ value: item.id, label: item.name });

export function useUserFormDerived({ control, fieldNames, setValue, roles, counterparties }) {
  const selectedRoleId = useWatch({ control, name: fieldNames.role });
  const selectedCounterpartyId = useWatch({ control, name: fieldNames.counterparty });
  const selectedHubIds = useWatch({ control, name: fieldNames.hubs });

  const selectedRole = useMemo(
    () => findItemById(roles, selectedRoleId),
    [roles, selectedRoleId]
  );

  const showClientFields = selectedRole?.name?.includes('client-');

  const resetParams = {
    shouldDirty: true,
    shouldTouch: true,
    shouldValidate: true,
  }

  useEffect(() => {
    if (!selectedRoleId) return;

    if (!showClientFields) {
      if (selectedCounterpartyId) setValue(fieldNames.counterparty, null, resetParams);
      if (selectedHubIds?.length) setValue(fieldNames.hubs, [], resetParams);
      return;
    }

    if (selectedHubIds?.length) {
      setValue(fieldNames.hubs, [], resetParams);
    }

  }, [selectedRoleId]);


  useEffect(() => {
    if (!selectedCounterpartyId) return;
  
    setValue(fieldNames.hubs, [], resetParams);
  }, [selectedCounterpartyId]);

  const filteredHubOptions = useMemo(() => {
    const counterpartyHubs = findItemById(counterparties, selectedCounterpartyId)?.hubs;
    return counterpartyHubs?.map(mapOption);
  }, [selectedCounterpartyId, counterparties]);

  const selectOptions = {
    roleId: roles?.map(mapOption) || [],
    counterpartyId: counterparties?.map(mapOption) || [],
    hubIds: filteredHubOptions || [],
  };

  return {
    selectedRole,
    selectOptions,
    showClientFields,
  };
}