const text = {
  xs: 'text-xs', // 12px
  sm: 'text-sm', // 14px
  base: 'text-base', // 16px'
  lg: 'text-lg', // 18px'
  xl: 'text-xl', // 20px'
}
const colors = {
  border: 'border-gray-200',
  borderError: 'border-red-500',
  textError: 'text-red-500',
  disabled: 'opacity-50 cursor-not-allowed',
};

const labels = {
  table: `${text.sm} text-gray-400`,
  text: `${text.sm} text-gray-700`,
  formField: `${text.sm} text-gray-600`,
};

const inputText = {

};

const flex = {
  rowBetween: 'flex items-center justify-between',
  col: 'flex flex-col',
};

const disabled = {
  opacity: 'disabled:opacity-50',
  cursor: 'disabled:cursor-not-allowed',
};

const hover = {
  bg: 'hover:bg-gray-100',
};

export const styleTokens = {

  // Table
  table: {
    desktop: 'min-w-full border border-gray-200 rounded-xl overflow-hidden table-fixed',
    label: `p-3 text-left ${labels.table}`,
  },

  spacing: {
    fieldGap: 'mt-2',
    labelMargin: 'mb-1',
    groupGap: 'gap-2',
  },

  // Form
  fieldWrapper: 'mt-2',
  actionLabelWrapper: flex.rowBetween,

  groupControlContainer: 'flex flex-col gap-2',
  inlineControlLabel: 'flex items-center gap-2 cursor-pointer',
  inlineControlText: 'text-base text-gray-700',

  fieldLabel: labels.formField,
  fieldError: `${colors.textError} ml-1`,

  rowsContainer: flex.col,
  rowField: `${flex.rowBetween} 
    p-3 border-b border-gray-200 
    hover:bg-gray-50 
    cursor-pointer transition-colors`,

  inputBase:
    `w-full p-2 
    border ${colors.border} rounded 
    cursor-pointer
    disabled:opacity-50 
    disabled:cursor-not-allowed`,
  inputError: colors.borderError,

  // Buttons
  iconBtn: text.xs 
    + 'px-2 py-1 rounded border' 
    + hover.bg 
    + disabled.opacity 
    + disabled.cursor,


};