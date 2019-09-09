export const centsToDollar = (cents) => {
  if (isNaN(cents)) {
    return 0;
  }
  return (cents / 100).toFixed(2);
};
