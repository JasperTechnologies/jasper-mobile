import React from "react"
import { PaymentView as CloverPaymentView } from './clover';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_CART,
	GET_TIP_PERCENTAGE,
	GET_LOCATION,
  GET_PAYMENT_PROCESSOR,
} from '../../constants/graphql-query';

export default function PaymentView() {
  const { data: { cart } } = useQuery(GET_CART);
  const { data: { tipPercentage } } = useQuery(GET_TIP_PERCENTAGE);
  const { data: { location: { taxes } } } = useQuery(GET_LOCATION);
  // check platform
  const { data: paymentProcessorData, loading } = useQuery(GET_PAYMENT_PROCESSOR);
  if (loading) {
    return null;
  }
  return <CloverPaymentView cart={cart} taxes={taxes} tipPercentage={tipPercentage} />;
}
