import React from "react"
import { PaymentView as CloverPaymentView } from './clover';
import { useQuery } from '@apollo/react-hooks';
import {
  GET_CART,
	GET_TIP_PERCENTAGE,
	GET_LOCATION,
} from '../../constants/graphql-query';
import { getProvider } from '../../utilities/payment-processor';

export default function PaymentView() {
  const { data: { cart } } = useQuery(GET_CART);
  const { data: { tipPercentage } } = useQuery(GET_TIP_PERCENTAGE);
  const { data: locationData, loading, error } = useQuery(GET_LOCATION);
  const provider = getProvider(locationData ? locationData.location : null);
  if (loading || !provider || !locationData) {
    return null;
  }
  const { location } = locationData;
  if (provider === 'CLOVER') {
    return <CloverPaymentView cart={cart} taxes={location && location.taxes} tipPercentage={tipPercentage} />;
  }
  return null;
}
