import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { mapOption } from '@/core/utils/options.map';

export function useCounterpartyFormDerived({ 
  control, 
  fieldNames, 
  setValue, 
  hubs,
  products,
  paymentTypes,
  organizations, 
  employees, 
}) {
  const options = {
    // hubIds: hubs?.map(mapOption) || [],
    products: products?.map(el => mapOption(el, 'namePublic')) || [],
    // employeeIds: employees?.map(mapOption) || [],
    paymentTypes: paymentTypes?.map(el => mapOption(el)) || [],
    organizations: organizations?.map(el => mapOption(el)) || [],
  };

  return {
    options,
  };
}