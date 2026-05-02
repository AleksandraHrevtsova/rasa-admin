import { useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

const findItemById = (arr, id) => arr.find(el => el.id === id);
const mapOption = (item) => ({ value: item.id, label: item.name });

export function useProductFormDerived({ 
  control, 
  fieldNames, 
  setValue, 
}) {

  return null;
}