import React from "react"
import { useQuery } from '@apollo/react-hooks';
import {
	GET_LOCATION,
} from '../../constants/graphql-query';
import { CloverStatusIndicator } from './clover';
import { getProvider } from '../../utilities/payment-processor';

export function PaymentProcessorStatusIndicator() {
  const { data: locationData, loading, error } = useQuery(GET_LOCATION);
  const provider = getProvider(locationData ? locationData.location : null);
  if (loading || !provider || !locationData) {
    return null;
  }

  if (provider === 'CLOVER') {
    return CloverStatusIndicator();
  }
  return null;
}
