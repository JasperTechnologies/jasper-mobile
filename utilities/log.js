export function cartToOrderLogs(cart) {
  return cart.map((item) => {
    return {
      menuItemId: item.id,
      optionValueIds: item.form.optionValues ? item.form.optionValues.map(ov => {
        return ov.id;
      }) : [],
      quantity: item.form.quantity
    };
  });
}
