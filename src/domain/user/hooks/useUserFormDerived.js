import { useEffect, useMemo, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { mapOption, findItemById } from '@/core/utils/options.map';

export function useUserFormDerived(props) {
  const {
    control,
    fieldNames,
    setValue,
    roles,
    counterparties,
  } = props;

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
  };

  const prevCounterpartyRef = useRef();
  // ROLE CHANGE
  useEffect(() => {
    if (!selectedRoleId) return;

    if (!showClientFields) {
      if (selectedCounterpartyId) setValue(fieldNames.counterparty, null, resetParams);
      if (selectedHubIds?.length) setValue(fieldNames.hubs, [], resetParams);
    }
  }, [
    selectedRoleId,
    showClientFields,
    selectedCounterpartyId,
    selectedHubIds,
    setValue,
    fieldNames,
  ]);

  // COUNTERPARTY CHANGE
  useEffect(() => {
    // initial form load
    if (prevCounterpartyRef.current === undefined) {
      prevCounterpartyRef.current = selectedCounterpartyId;
      return;
    }

    // user changed counterparty
    if (prevCounterpartyRef.current !== selectedCounterpartyId) {
      setValue(fieldNames.hubs, [], resetParams);
    }

    prevCounterpartyRef.current = selectedCounterpartyId;
  }, [
    selectedCounterpartyId,
    setValue,
    fieldNames,
  ]);

  const filteredHubOptions = useMemo(() => {
    const counterpartyHubs = findItemById(counterparties, selectedCounterpartyId)?.hubs;
    return counterpartyHubs?.map(el => mapOption(el));
  }, [selectedCounterpartyId, counterparties]);

  const options = {
    roleId: roles?.map(el => mapOption(el)) || [],
    counterpartyId: counterparties?.map(el => mapOption(el)) || [],
    hubIds: filteredHubOptions || [],
  };

  return {
    selectedRole,
    options,
    showClientFields,
  };
}