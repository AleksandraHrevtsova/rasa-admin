export const copyData = async (textArr, setIsCopied) => {
  const preparedText = textArr.filter(Boolean).join('\n');

  try {
    await navigator.clipboard.writeText(preparedText);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);

  } catch (err) {
    console.error(err);
  }
};