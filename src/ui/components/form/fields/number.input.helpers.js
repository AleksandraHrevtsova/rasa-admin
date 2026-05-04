export const handleNumberKeyDown = (e) => {
  const allowed = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    ',',
    '.',
  ];

  if (
    !allowed.includes(e.key) &&
    !(e.key >= '0' && e.key <= '9')
  ) {
    e.preventDefault();
  }
};