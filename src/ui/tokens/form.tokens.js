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

  cursor: {
    pointer: 'pointer',
    none: '',
  },
  shimmer: {
    wrapper: 'absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-start justify-center pt-2 z-20',
    block: 'w-full px-2',
    content: 'h-1 w-full bg-blue-400/40 animate-pulse rounded',
  },
  pagination: {
    arrowButton: 'p-2 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition',
    wrapper1: 'mt-4 flex justify-center md:justify-between',
    wrapper2: 'flex items-center justify-between gap-3 mt-4 flex-wrap',
    arrowBlock: 'flex items-center gap-1',
    countBlock: 'flex items-center gap-2',

    content: 'text-sm text-gray-500',

    select: 'border rounded-md px-2 py-1 text-sm bg-white',
  },
  table: {
    skeletonTableWrapper: 'hidden md:block overflow-x-auto',
    skeletonTableHead: 'bg-gray-50',
    skeletonRow: 'border-b',
    cellWidths: {
      full: '80%',
      regular: '60%',
      small: '30%',
    },
    cellPadding: 'p-3',
    shimmer: 'h-4 rounded shimmer',

    fullWidthWrapper: 'w-full',
    overlayWrapper: 'relative transition-opacity duration-200',
    overlayOpacityIsFetching: 'opacity-60',
    overlayOpacityFetched: 'opacity-100',
    desktopTableWrapper: 'hidden md:block overflow-x-auto',
    desktop: 'min-w-full border border-gray-200 rounded-xl overflow-hidden table-fixed',
    label: `p-3 text-left ${labels.table}`,
    headWrapper: 'bg-gray-50 sticky top-0 z-10',
    headLabel: 'p-3 text-sm text-gray-600 text-left font-semibold select-none',

    arrowBlock: 'flex items-center gap-1',
    arrowColor: 'text-gray-500',
    arrowSize: 14,

    rowWrapper: 'border-b cursor-pointer transition-colors duration-700 hover:bg-gray-50',
    rowHighlighted: 'bg-yellow-50 animate-pulse',
    rowContent: 'p-3 text-sm text-gray-800',

    mobileWrapper: 'md:hidden flex flex-col gap-3',
    mobileTableBlock: 'border rounded-xl p-3 shadow-sm bg-white hover:bg-gray-50 transition cursor-pointer',
    mobileCard: 'flex justify-between text-sm py-1 border-b last:border-b-0',
    mobilCardLabel: 'text-gray-500',
    mobilCardContent: 'text-gray-900 font-medium text-right',
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