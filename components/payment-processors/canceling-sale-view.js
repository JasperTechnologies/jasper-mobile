import React from "react"
import { useQuery } from '@apollo/react-hooks';
import {
  GET_PAYMENT_PROCESSOR
} from '../../constants/graphql-query';
import { CancelingSaleView as CloverCancelingSaleView } from './clover';

export default function CancelingSaleView() {
  // check plaform
  const { data: paymentProcessorData, loading } = useQuery(GET_PAYMENT_PROCESSOR);
  if (loading) {
    return null;
  }
  return <CloverCancelingSaleView />;
}
