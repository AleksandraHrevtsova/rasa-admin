export const mapOption = (item, labelKey = 'name') => ({
  value: item.id,
  label: item[labelKey],
});

export const findItemById = (arr, id) => arr.find(el => el.id === id);