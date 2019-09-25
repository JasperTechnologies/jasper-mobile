import React from "react"
import { PaymentView as CloverPaymentView } from './clover';

export default function PaymentView({ cart, taxes, tipPercentage }) {
  // check platform
  return <CloverPaymentView cart={cart} taxes={taxes} tipPercentage={tipPercentage} />;
}
