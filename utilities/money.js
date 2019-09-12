export const centsToDollar = (cents) => {
  if (isNaN(cents)) {
    return 0;
  }
  return (cents / 100).toFixed(2);
};

export const calculateTotalPrice = (basePrice, quantity, options) => {
  if (isNaN(basePrice) || isNaN(quantity)) {
    return 0;
  }

  const optionPrices = options.reduce((sum, option) => {
    if (isNaN(option.price)) {
      return sum;
    }
    return sum + option.price;
  }, 0);
  return (basePrice + optionPrices) * quantity;
};

export const getSubtotalOfCart = (items) => {
  return items.reduce((sum, item) => {
    return sum + calculateTotalPrice(item.price, item.form.quantity, item.form.options);
  }, 0);
};

export const getSubtotalTaxOfCart = (items) => {
  return getSubtotalOfCart(items) * 0.07;
};

export const getTotalOfCart = (items) => {
  return getSubtotalTaxOfCart(items) + getSubtotalOfCart(items);
};
