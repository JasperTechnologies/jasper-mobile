import clover from 'remote-pay-cloud';
import {
  calculateTotalPrice,
  getSubtotalOfCart,
  getSubtotalTaxOfCart,
  getTotalOfCart,
  centsToDollar
} from '../../../utilities/money';

export function optionValueToDisplayModification(optionValue) {
  const displayModification = new clover.sdk.order.DisplayModification();
  displayModification.setId(clover.CloverID.getNewId());
  displayModification.setName(optionValue.title);
  return displayModification;
}

export function menuItemToDisplayLineItem(menuItem) {
  const displayLineItem = new clover.sdk.order.DisplayLineItem();
  displayLineItem.setId(clover.CloverID.getNewId());
  displayLineItem.setName(menuItem.title);
  displayLineItem.setPrice(`$${centsToDollar(calculateTotalPrice(menuItem.price, menuItem.form.quantity, menuItem.form.optionValues))}`);
  displayLineItem.setQuantity(menuItem.form.quantity);
  const displayModifications = menuItem.form.optionValues.map(ov => optionValueToDisplayModification(ov));
  displayLineItem.setModifications(displayModifications);
  return displayLineItem;
}

export function cartToDisplayOrder(cart, taxes) {
  const displayOrder = new clover.sdk.order.DisplayOrder();
  displayOrder.setId(clover.CloverID.getNewId());
  displayOrder.setCurrency('USD');
  displayOrder.setSubtotal(`$${centsToDollar(getSubtotalOfCart(cart))}`);
  displayOrder.setTax(`$${centsToDollar(getSubtotalTaxOfCart(cart, taxes))}`);
  displayOrder.setTotal(`$${centsToDollar(getTotalOfCart(cart))}`);
  const displayLineItems = cart.map(menuItemToDisplayLineItem);
  displayOrder.setLineItems(displayLineItems);
  return displayOrder;
}
