import React from "react"
import { useQuery } from '@apollo/react-hooks';
import {
  GET_LOCATION
} from '../../constants/graphql-query';
import { CancelingSaleView as CloverCancelingSaleView } from './clover';
import { getProvider } from '../../utilities/payment-processor';

export default function CancelingSaleView() {
  // check plaform
  const { data: locationData, loading, error } = useQuery(GET_LOCATION);
  const provider = getProvider(locationData ? locationData.location : null);
  if (loading || !provider) {
    return null;
  }

  if (provider === 'CLOVER') {
    return <CloverCancelingSaleView />;
  }
  return null;
}
