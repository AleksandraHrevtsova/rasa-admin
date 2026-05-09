import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

const findItemById = (arr, id) => arr.find(el => el.id === id);
const mapOption = (item) => ({ value: item.id, label: item.name });

export function useCounterpartyFormDerived({ 
  control, 
  fieldNames, 
  setValue, 
  hubs,
  products,
  employees, 
  paymentTypes,
  organozations, 
}) {
  const selectOptions = {
    hubIds: hubs?.map(mapOption) || [],
    productIds: products?.map(mapOption) || [],
    employeeIds: employees?.map(mapOption) || [],
    paymentTypeIds: paymentTypes?.map(mapOption) || [],
    organozationIds: organozations?.map(mapOption) || [],
  };

  return {
    selectOptions,
  };
}