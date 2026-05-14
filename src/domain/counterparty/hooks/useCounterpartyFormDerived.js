import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { mapOption } from '@/core/utils/options.map';

export function useCounterpartyFormDerived({ 
  control, 
  fieldNames, 
  setValue, 
  productsSet,
  paymentTypesSet,
  data, 
}) {
  const options = {
    products: productsSet?.map(el => mapOption(el, 'namePublic')) || [],
    paymentTypes: paymentTypesSet?.map(el => mapOption(el)) || [],
  };

  const employeesView = useMemo(() => {
    return data?.employees?.map(e => {
      console.log('E:', e.hubs);
      return {
        id: e.id,
        name: e.name,
        hubNames: (e.hubs || []).map(h => h.name).join(', '),
      };
    });
  }, [data?.employees]);

  return {
    options,
    employeesView,
  };
}