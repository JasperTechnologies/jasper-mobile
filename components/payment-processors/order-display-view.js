import React from "react"
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
  GET_CART,
	GET_TIP_PERCENTAGE,
	GET_LOCATION,
} from '../../constants/graphql-query';
import { OrderDisplayView as CloverOrderDisplayView } from './clover';

export default function OrderDisplayView() {
  const { data: { cart }, loading, error } = useQuery(GET_CART);
  const { data: { tipPercentage } } = useQuery(GET_TIP_PERCENTAGE);
  const { data: { location: { taxes } } } = useQuery(GET_LOCATION);
  // check plaform
  return <CloverOrderDisplayView cart={cart} taxes={taxes} tipPercentage={tipPercentage} />;
}
