import React from "react"
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
  GET_CART,
	GET_TIP_PERCENTAGE,
	GET_LOCATION,
  GET_PAYMENT_PROCESSOR,
} from '../../constants/graphql-query';
import { OrderDisplayView as CloverOrderDisplayView } from './clover';

export default function OrderDisplayView() {
  const { data: { cart } } = useQuery(GET_CART);
  const { data: { tipPercentage } } = useQuery(GET_TIP_PERCENTAGE);
  const { data: { location: { taxes } } } = useQuery(GET_LOCATION);
  // check plaform
  const { data: paymentProcessorData, loading } = useQuery(GET_PAYMENT_PROCESSOR);
  if (loading) {
    return null;
  }
  return <CloverOrderDisplayView cart={cart} taxes={taxes} tipPercentage={tipPercentage} />;
}
