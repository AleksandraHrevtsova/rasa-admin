import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { mapOption } from '@/core/utils/options.map';

export function useCounterpartyFormDerived({ 
  t,
  k,
  control, 
  fieldNames, 
  setValue, 
  products,
  paymentTypes,
  data, 
}) {

  const requisiteMode = useWatch({ control, name: fieldNames.requisiteMode });

  // const resetParams = useMemo(() => ({
  //   shouldDirty: true,
  //   shouldTouch: true,
  //   shouldValidate: true,
  // }), []);

  const isTargetModeOnly = requisiteMode === 'TARGET_ONLY';

  const options = {
    products: products?.map(el => mapOption(el, 'namePublic')) || [],
    paymentTypes: paymentTypes?.map(el => mapOption(el)) || [],
    requisiteMode: [
      { value: 'REGULAR_ONLY', label: t(k.counterparty.regular) },
      { value: 'TARGET_ONLY', label: t(k.counterparty.target) },
      { value: 'BOTH', label: t(k.counterparty.both) },
    ],
  };

  const employeesView = useMemo(() => {
    return data?.employees?.map(e => {
      return {
        id: e.id,
        name: e.name,
        hubNames: (e.hubs || []).map(h => h.name).join(', '),
      };
    });
  }, [data?.employees]);

  const hubsView = useMemo(() => {
    return data?.hubs?.map(e => {
      return {
        id: e.id,
        name: e.namePublic,
        address: e.address,
      };
    });
  }, [data?.employees]);

  return {
    options,
    employeesView,
    hubsView,
    isTargetModeOnly,
  };
}