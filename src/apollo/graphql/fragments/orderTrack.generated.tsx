import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type TrackStepFragment = { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any };

export type OrderTrackFragment = { __typename?: 'OrderTrack', confirmOrder: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, productPrepared: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, shipped: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, outForDelivery: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any }, delivered: { __typename?: 'TrackStep', status: Types.OrderStatus, updatedAt: any } };

export const TrackStepFragmentDoc = gql`
    fragment TrackStep on TrackStep {
  status
  updatedAt
}
    `;
export const OrderTrackFragmentDoc = gql`
    fragment OrderTrack on OrderTrack {
  confirmOrder {
    ...TrackStep
  }
  productPrepared {
    ...TrackStep
  }
  shipped {
    ...TrackStep
  }
  outForDelivery {
    ...TrackStep
  }
  delivered {
    ...TrackStep
  }
}
    ${TrackStepFragmentDoc}`;