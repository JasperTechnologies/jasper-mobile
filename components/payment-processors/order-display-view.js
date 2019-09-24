import React from "react"
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { OrderDisplayView as CloverOrderDisplayView } from './clover';
import {
  GET_CART
} from '../../constants/graphql-query';

export default function OrderDisplayView({ cart, taxes, tipPercentage }) {
  // check plaform
  return <CloverOrderDisplayView cart={cart} taxes={taxes} tipPercentage={tipPercentage} />;
}
