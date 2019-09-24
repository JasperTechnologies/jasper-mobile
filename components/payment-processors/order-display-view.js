import React from "react"
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { OrderDisplayView as CloverOrderDisplayView } from './clover';
import {
  GET_CART
} from '../../constants/graphql-query';

export default function OrderDisplayView() {
  const { data: cartData, loading, error } = useQuery(GET_CART);
  if (loading || error) {
    return null;
  }
  const { cart } = cartData;

  // check plaform
  return <CloverOrderDisplayView cart={cart} />;
}
