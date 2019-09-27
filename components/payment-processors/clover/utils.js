import clover from 'remote-pay-cloud';
import {
  calculateTotalPrice,
  getSubtotalOfCart,
  getSubtotalTaxOfCart,
  getTotalOfCart,
  getTipsOfCart,
  centsToDollar
} from '../../../utilities/money';

export function toDisplayModification(optionValue) {
  const displayModification = new clover.sdk.order.DisplayModification();
  displayModification.setId(clover.CloverID.getNewId());
  displayModification.setName(optionValue.title);
  return displayModification;
}

export function toDisplayLineItem(menuItem) {
  const displayLineItem = new clover.sdk.order.DisplayLineItem();
  displayLineItem.setId(clover.CloverID.getNewId());
  displayLineItem.setName(menuItem.title);
  displayLineItem.setPrice(`$${centsToDollar(calculateTotalPrice(menuItem.price, menuItem.form.quantity, menuItem.form.optionValues))}`);
  displayLineItem.setQuantity(menuItem.form.quantity);
  const displayModifications = menuItem.form.optionValues.map(ov => toDisplayModification(ov));
  displayLineItem.setModifications(displayModifications);
  return displayLineItem;
}

export function toDisplayTip(tip) {
  const displayPayment = new clover.sdk.order.DisplayPayment();
  displayPayment.setId(clover.CloverID.getNewId());
  displayPayment.setAmount(`$${centsToDollar(tip)}`);
  displayPayment.setLabel("Tip")
  return displayPayment;
}

export function toDisplayOrder(cart, taxes, tipPercentage) {
  const displayOrder = new clover.sdk.order.DisplayOrder();
  displayOrder.setId(clover.CloverID.getNewId());
  displayOrder.setCurrency('USD');
  displayOrder.setSubtotal(`$${centsToDollar(getSubtotalOfCart(cart))}`);
  displayOrder.setTax(`$${centsToDollar(getSubtotalTaxOfCart(cart, taxes))}`);
  displayOrder.setTotal(`$${centsToDollar(getTotalOfCart(cart) + getSubtotalTaxOfCart(cart, taxes))} + Tip`);
  const displayLineItems = cart.map(toDisplayLineItem);
  displayOrder.setLineItems(displayLineItems);
  displayOrder.setPayments([toDisplayTip(getTipsOfCart(cart, tipPercentage))]);
  displayOrder.setAmountRemaining(`$${centsToDollar(getTotalOfCart(cart) + getSubtotalTaxOfCart(cart, taxes) + getTipsOfCart(cart, tipPercentage))}`)
  return displayOrder;
}

export function toSaleRequest(cart, taxes, tipPercentage) {
  const saleRequest = new clover.sdk.remotepay.SaleRequest();
  saleRequest.setExternalId(clover.CloverID.getNewId());
  saleRequest.setAmount(getTotalOfCart(cart) + getSubtotalTaxOfCart(cart, taxes));
  saleRequest.setTaxAmount(getSubtotalTaxOfCart(cart, taxes));
  saleRequest.setTipAmount(getTipsOfCart(cart, tipPercentage));
  saleRequest.setTipMode("TIP_PROVIDED");
  saleRequest.setDisableDuplicateChecking(true);
  saleRequest.setDisableReceiptSelection(true);
  return saleRequest;
}

export function toCustomerReceipt(cart, taxes, tipPercentage, payment, location) {
  const printRequest = new clover.sdk.remotepay.PrintRequest();
  const text = [];
  if (location) {
    text.push(location.name);
  }
  if (payment && payment.cardTransaction) {
    text.push(`Order Number: ${payment.cardTransaction.transactionNo}`);
  }
  text.push("=========================");
  cart.forEach((item) => {
    text.push(`$${centsToDollar(calculateTotalPrice(item.price, item.form.quantity, item.form.optionValues))} ${item.title} [${item.form.quantity}]`);
    item.form.optionValues.forEach((ov) => {
      text.push(`  ${ov.title}`)
    });
  });
  text.push("");
  if (payment && payment.cardTransaction && payment.cardTransaction.vaultedCard) {
    text.push(`XXXXXXXXXXX${payment.cardTransaction.vaultedCard.last4}`);
  }
  text.push(`Subtotal & Tax $${centsToDollar(getTotalOfCart(cart) + getSubtotalTaxOfCart(cart, taxes))}`);
  text.push(`Tip $${centsToDollar(getTipsOfCart(cart, tipPercentage))}`);
  if (payment) {
    text.push(`Total $${centsToDollar(payment.amount + payment.tipAmount)}`);
  }
  text.push("");
  text.push("");
  printRequest.setText(text)
  return printRequest;
}

export function toEnterInputOption(cart) {
  const inputOption = new clover.sdk.remotepay.InputOption();
  inputOption.setKeyPress("ENTER");
  return inputOption;
}

export function toEscInputOption(cart) {
  const inputOption = new clover.sdk.remotepay.InputOption();
  inputOption.setKeyPress("ESC");
  return inputOption;
}

export function toLineItemsPayload(cart) {
  return cart.map((item) => {
    return {
      name: item.title,
      price: item.price,
      itemId: item.paymentProcessorId,
      modifications: item.form.optionValues.map((optionValue) => {
        return {
          name: optionValue.title,
          price: optionValue.price,
          modificationId: item.paymentProcessorId
        }
      })
    };
  });
}
